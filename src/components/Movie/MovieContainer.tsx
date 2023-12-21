import { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css'
import MovieCard from './MovieCard';
import { Movie } from '../types';

type MovieResponse = Partial<Movie>;

const MovieContainer = () => {

  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchInput === '') {
      setMovies([]);
    }
    if (searchInput) {
      findMoviesByTitle(searchInput);
    }
    console.log("searchInput:", searchInput);
  }, [searchInput]);

  const findMoviesByTitle = async (input: string) => {
    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=26b46150aed602c1008beb3130ac634f&query=${input}`)
      .then((response) => {
        setIsLoading(true);
        setMovies(response.data.results.filter((m: Movie) => m.poster_path !== null));
        console.log(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleInputChange = (input: string) => {
    setSearchInput(input);
  }

  return (
    <div className="movie-container">
      <input
        placeholder='search a movie'
        onChange={e => handleInputChange(e.target.value)}
      />
      <div className="movie-list"> {/* Yeni div ekleyerek yatay kaydırma için */}
        {movies && movies.map((movie: Partial<Movie>, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MovieContainer