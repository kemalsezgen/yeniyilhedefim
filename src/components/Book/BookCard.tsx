import { Book, BookResponse } from '../types';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

type BookProps = {
  book: Partial<Book>;
  onAddToList: (e: any, selectedBook: BookResponse) => void;
  isSelected: boolean;
  onRemoveFromList: (e: any, selectedBook: BookResponse) => void;
};

const BookCard: React.FC<BookProps> = ({ book, onAddToList, isSelected, onRemoveFromList }) => {

  const thumbnail = book.volumeInfo?.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
  const bookTitle = book.volumeInfo?.title;
  const authors = book.volumeInfo?.authors?.join(' | ');

  const addOrRemove = (e: any, book:BookResponse) => {
    if (isSelected) {
      onRemoveFromList(e, book);
    } else {
      onAddToList(e, book)
    }
  }

  return (
    <div className={`book-box ${isSelected ? 'selected' : 'notSelected'}`} onClick={(e) => addOrRemove(e, book)}>
      {thumbnail && <div className='book-img'><img src={thumbnail} alt={`${bookTitle} - poster`} /></div>}
      <div className="plus-icon"><FaPlusCircle size={40}/></div>
      <div className="minus-icon"><FaMinusCircle size={40}/></div>
      {bookTitle && bookTitle.length <= 200 ? <h2>{bookTitle}</h2> : <h2>{`${bookTitle?.substring(0, 200)} ...`}</h2>}
      {authors && <h3>{`(${authors})`}</h3>}
    </div>
  )
}

export default BookCard