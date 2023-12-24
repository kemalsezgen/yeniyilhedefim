import { Book, BookResponse } from '../types';
import BookCard from './BookCard';

type BookProps = {
  selectedBooks: BookResponse[];
  onAddToList: (e: any, selectedBook:BookResponse) => void;
  onRemoveFromList: (e: any, selectedBook:BookResponse) => void;
};

const SelectedBooks: React.FC<BookProps> = ({ selectedBooks, onAddToList, onRemoveFromList }) => {
  return (
    <div className="selectedBooks-container">
      {selectedBooks.length > 0 ? (<h2>2024 BOOKS LIST</h2>) : null}
      <br />
      <div className="book-list">
          {selectedBooks && selectedBooks.map((book: Partial<Book>, index) => (
            <BookCard book={book} key={index} onAddToList={onAddToList} isSelected={true} onRemoveFromList={onRemoveFromList}/>
          ))}
        </div>
    </div>
  )
}

export default SelectedBooks;