import { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css'

import MovieCard from './MovieCard';
import SelectedMovies from './SelectedMovies';
import { Movie } from '../types';

type MovieResponse = Partial<Movie>;

const MovieContainer = () => {

  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieResponse[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<MovieResponse[]>(popularMovies);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    if (searchInput === '') {
      setMovies(popularMovies);
    }
    if (searchInput) {
      findMoviesByTitle(searchInput);
    }
  }, [searchInput, popularMovies]);

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
        console.log(response.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const fetchPopularMovies = async () => {
    await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=26b46150aed602c1008beb3130ac634f`)
      .then((response) => {
        setIsLoading(true);
        setPopularMovies(response.data.results.filter((m: Movie) => m.poster_path !== null));
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
      <input
        placeholder='what are you going to watch in 2024? choose some movies to watch.'
        onChange={e => handleInputChange(e.target.value)}
      />
      {searchInput == '' && <h3>WHAT IS POPULAR?</h3>}
      {isLoading ? (<p>Loading...</p>) :
        <div className="movie-list">
          {popularMovies && movies && movies.map((movie: Partial<Movie>, index) => (
            <MovieCard movie={movie} key={index} onAddToList={handleAddToList} isSelected={isSelectedMovie(movie)} onRemoveFromList={handleRemoveFromList}/>
          ))}
        </div>}
      <hr />
      <SelectedMovies selectedMovies={selectedMovies} onAddToList={handleAddToList} onRemoveFromList={handleRemoveFromList}/>
    </div>
  );
}

export default MovieContainer