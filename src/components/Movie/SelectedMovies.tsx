import { Movie, MovieResponse } from '../types';
import MovieCard from './MovieCard';

type MovieProps = {
  selectedMovies: MovieResponse[];
  onAddToList: (e: any, selectedMovie:MovieResponse) => void;
  onRemoveFromList: (e: any, selectedMovie:MovieResponse) => void;
};

const SelectedMovies: React.FC<MovieProps> = ({ selectedMovies, onAddToList, onRemoveFromList }) => {
  return (
    <div className="selectedMovies-container">
      {selectedMovies.length > 0 ? (<h2>2024 MOVIE LIST</h2>) : null}
      <br />
      <div className="movie-list">
          {selectedMovies && selectedMovies.map((movie: Partial<Movie>, index) => (
            <MovieCard movie={movie} key={index} onAddToList={onAddToList} isSelected={true} onRemoveFromList={onRemoveFromList}/>
          ))}
        </div>
    </div>
  )
}

export default SelectedMovies;