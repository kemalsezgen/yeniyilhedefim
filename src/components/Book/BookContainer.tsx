import { useEffect, useState } from 'react';
import axios from 'axios';
import './Book.css'

import BookCard from './BookCard';
import SelectedBooks from './SelectedBooks';
import { Book } from '../types';


type BookResponse = Partial<Book>;

const BookContainer = () => {

  const [books, setBooks] = useState<BookResponse[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<BookResponse[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchInput === '') {
      setBooks([]);
    }
    if (searchInput) {
      findBookByTitle(searchInput);
    }
  }, [searchInput]);

  useEffect(() => {
    console.log("Books")
    selectedBooks.forEach(book => {
      const bookTitle = book.volumeInfo?.title;
      console.log(bookTitle);
    });
    console.log("----------------------------------------------------------------");
  }, [selectedBooks]);

  const findBookByTitle = async (input: string) => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyBuAATYsUdG0vFVDdTQbrZlgSHpqyikuew`)
      .then((response) => {
        setIsLoading(true);
        const responseObj = response.data.items;
        setBooks(responseObj.filter((b: Book) => b.volumeInfo.imageLinks !== null && b.volumeInfo.imageLinks !== undefined
          && b.volumeInfo.imageLinks.smallThumbnail != null && b.volumeInfo.imageLinks.smallThumbnail !== undefined));
        console.log("res:", responseObj);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      }).finally(
        () => { setIsLoading(false) }
      )
  }

  const handleInputChange = (input: string) => {
    setSearchInput(input);
  }

  const handleAddToList = (e: any, selectedBook: BookResponse) => {
    e.stopPropagation();
    const isBookInSelectedList: boolean = selectedBooks.some((book: BookResponse) => book.id === selectedBook.id);
    if (!isBookInSelectedList) {
      setSelectedBooks([...selectedBooks, selectedBook]);
    }
  };

  const handleRemoveFromList = (e: any, selectedBook: BookResponse) => {
    e.stopPropagation();
    const newSelectedBooks = selectedBooks.filter((book: BookResponse) => book.id !== selectedBook.id);
    setSelectedBooks(newSelectedBooks);
  };

  const isSelectedBook = (book: BookResponse) => {
    return selectedBooks.some((b: BookResponse) => b.id === book.id);
  }

  return (
    <div className="book-container">
      <input
        placeholder='what are you going to read in 2024?'
        onChange={e => handleInputChange(e.target.value)}
      />
      {isLoading ? (<p>Loading...</p>) :
        <div className="book-list">
          {books && books.map((book: Partial<Book>, index) => (
            <BookCard book={book} key={index} onAddToList={handleAddToList} isSelected={isSelectedBook(book)} onRemoveFromList={handleRemoveFromList} />
          ))}
        </div>}
      <hr />
      <SelectedBooks selectedBooks={selectedBooks} onAddToList={handleAddToList} onRemoveFromList={handleRemoveFromList} />
    </div>
  );
}

export default BookContainer