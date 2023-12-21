import { Movie } from '../types';

type MovieProps = {
  movie: Partial<Movie>;
};

const MovieCard : React.FC<MovieProps> = ({movie}) => {
  return (
    <div className='movie-box'>
      {movie.title && movie.title.length <= 22 ? <h2>{movie.title}</h2> : <h2>{`${movie.title?.substring(0, 20)} ...`}</h2>}
      {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />}
    </div>
  )
}

export default MovieCard