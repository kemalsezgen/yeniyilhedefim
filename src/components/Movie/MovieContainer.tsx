import { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css'

import MovieCard from './MovieCard';
import SelectedMovies from './SelectedMovies';
import { Movie } from '../types';

type MovieResponse = Partial<Movie>;

const MovieContainer = () => {

  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<MovieResponse[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchInput === '') {
      setMovies([]);
    }
    if (searchInput) {
      findMoviesByTitle(searchInput);
    }
  }, [searchInput]);

  useEffect(() => {
    selectedMovies.forEach(movie => {
      console.log(movie.title);
    });
    console.log("----------------------------------------------------------------");
  }, [selectedMovies]);

  const findMoviesByTitle = async (input: string) => {
    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=26b46150aed602c1008beb3130ac634f&query=${input}`)
      .then((response) => {
        setIsLoading(true);
        setMovies(response.data.results.filter((m: Movie) => m.poster_path !== null));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleInputChange = (input: string) => {
    setSearchInput(input);
  }

  const handleAddToList = (e: any, selectedMovie:MovieResponse) => {
    e.stopPropagation();
    const isMovieInSelectedList:boolean = selectedMovies.some((m: MovieResponse) => m.id === selectedMovie.id);
    if (!isMovieInSelectedList) {
      setSelectedMovies([...selectedMovies, selectedMovie]);
    }
  };

  const handleRemoveFromList = (e: any, selectedMovie:MovieResponse) => {
    e.stopPropagation();
    const newSelectedMovies = selectedMovies.filter((m: MovieResponse) => m.id !== selectedMovie.id);
    setSelectedMovies(newSelectedMovies);
  };

  const isSelectedMovie = (movie:MovieResponse) => {
    return selectedMovies.some((m: MovieResponse) => m.id === movie.id);
  }

  return (
    <div className="movie-container">
      <h2>Yeni yılda izlemek istediğim filmler...</h2>
      <input
        placeholder='search a movie'
        onChange={e => handleInputChange(e.target.value)}
      />
      {isLoading ? (<p>Loading...</p>) :
        <div className="movie-list">
          {movies && movies.map((movie: Partial<Movie>, index) => (
            <MovieCard movie={movie} key={index} onAddToList={handleAddToList} isSelected={isSelectedMovie(movie)} onRemoveFromList={handleRemoveFromList}/>
          ))}
        </div>}
      <hr />
      <SelectedMovies selectedMovies={selectedMovies} onAddToList={handleAddToList} onRemoveFromList={handleRemoveFromList}/>
    </div>
  );
}

export default MovieContainer