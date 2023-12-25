import { useEffect, useState } from 'react';
import axios from 'axios';
import './TvShow.css'

import TvShowCard from './TvShowCard';
import SelectedTvShows from './SelectedTvShows';
import { TvShow } from '../types';

type TvShowResponse = Partial<TvShow>;

const TvShowContainer = () => {

  const [tvShows, setTvShows] = useState<TvShowResponse[]>([]);
  const [popularTvShows, setPopularTvShows] = useState<TvShowResponse[]>([]);
  const [selectedTvShows, setSelectedTvShows] = useState<TvShowResponse[]>(popularTvShows);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPopularTvShows();
  }, []);

  useEffect(() => {
    if (searchInput === '') {
      setTvShows(popularTvShows);
    }
    if (searchInput) {
      findTvShowsByTitle(searchInput);
    }
  }, [searchInput, popularTvShows]);

  useEffect(() => {
    selectedTvShows.forEach(tvShow => {
      console.log(tvShow.name);
    });
    console.log("----------------------------------------------------------------");
  }, [selectedTvShows]);

  const findTvShowsByTitle = async (input: string) => {
    await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=26b46150aed602c1008beb3130ac634f&query=${input}`)
      .then((response) => {
        setIsLoading(true);
        setTvShows(response.data.results.filter((m: TvShow) => m.poster_path !== null));
        console.log(response.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const fetchPopularTvShows = async () => {
    await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=26b46150aed602c1008beb3130ac634f&language=en-US&sort_by=popularity.desc`)
      .then((response) => {
        setIsLoading(true);
        setPopularTvShows(response.data.results.filter((m: TvShow) => m.poster_path !== null));
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

  const handleAddToList = (e: any, selectedTvShow:TvShowResponse) => {
    e.stopPropagation();
    const isTvShowInSelectedList:boolean = selectedTvShows.some((m: TvShowResponse) => m.id === selectedTvShow.id);
    if (!isTvShowInSelectedList) {
      setSelectedTvShows([...selectedTvShows, selectedTvShow]);
    }
  };

  const handleRemoveFromList = (e: any, selectedTvShow:TvShowResponse) => {
    e.stopPropagation();
    const newSelectedTvShows = selectedTvShows.filter((m: TvShowResponse) => m.id !== selectedTvShow.id);
    setSelectedTvShows(newSelectedTvShows);
  };

  const isSelectedTvShow = (tvShow:TvShowResponse) => {
    return selectedTvShows.some((m: TvShowResponse) => m.id === tvShow.id);
  }

  return (
    <div className="tvShow-container">
      <input
        placeholder='what are you going to watch in 2024? choose some series to watch.'
        onChange={e => handleInputChange(e.target.value)}
      />
      {searchInput == '' && <h3>WHAT IS POPULAR?</h3>}
      {isLoading ? (<p>Loading...</p>) :
        <div className="tvShow-list">
          {popularTvShows && tvShows && tvShows.map((tvShow: Partial<TvShow>, index) => (
            <TvShowCard tvShow={tvShow} key={index} onAddToList={handleAddToList} isSelected={isSelectedTvShow(tvShow)} onRemoveFromList={handleRemoveFromList}/>
          ))}
        </div>}
      <hr />
      <SelectedTvShows selectedTvShows={selectedTvShows} onAddToList={handleAddToList} onRemoveFromList={handleRemoveFromList}/>
    </div>
  );
}

export default TvShowContainer