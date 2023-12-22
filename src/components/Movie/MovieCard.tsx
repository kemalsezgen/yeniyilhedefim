import { Movie, MovieResponse } from '../types';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

type MovieProps = {
  movie: Partial<Movie>;
  onAddToList: (e: any, selectedMovie:MovieResponse) => void;
  isSelected: boolean;
  onRemoveFromList: (e: any, selectedMovie:MovieResponse) => void;
};

const MovieCard: React.FC<MovieProps> = ({ movie, onAddToList, isSelected, onRemoveFromList }) => {
  return (
    <div className={`movie-box ${isSelected ? 'selected' : 'notSelected'}`}>
      {movie.title && movie.title.length <= 22 ? <h2>{movie.title}</h2> : <h2>{`${movie.title?.substring(0, 20)} ...`}</h2>}
      {movie.poster_path && <div className='movie-img'><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} /></div>}
      <div className="plus-icon" onClick={(e) => onAddToList(e, movie)}><FaPlusCircle size={40}/></div>
      <div className="minus-icon" onClick={(e) => onRemoveFromList(e, movie)}><FaMinusCircle size={40}/></div>
    </div>
  )
}

export default MovieCard