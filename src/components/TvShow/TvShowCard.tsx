import { TvShow, TvShowResponse } from '../types';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

type TvShowProps = {
  tvShow: Partial<TvShow>;
  onAddToList: (e: any, selectedTvShow:TvShowResponse) => void;
  isSelected: boolean;
  onRemoveFromList: (e: any, selectedTvShow:TvShowResponse) => void;
};

const TvShowCard: React.FC<TvShowProps> = ({ tvShow, onAddToList, isSelected, onRemoveFromList }) => {

  const addOrRemove = (e: any, tvShow:TvShowResponse) => {
    if (isSelected) {
      onRemoveFromList(e, tvShow);
    } else {
      onAddToList(e, tvShow)
    }
  }

  return (
    <div className={`tvShow-box ${isSelected ? 'selected' : 'notSelected'}`} onClick={(e) => addOrRemove(e, tvShow)}>
      {tvShow.name && tvShow.name.length <= 22 ? <h2>{tvShow.name}</h2> : <h2>{`${tvShow.name?.substring(0, 20)} ...`}</h2>}
      {tvShow.poster_path && <div className='tvShow-img'><img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={`${tvShow.name} poster`} /></div>}
      <div className="plus-icon"><FaPlusCircle size={40}/></div>
      <div className="minus-icon"><FaMinusCircle size={40}/></div>
    </div>
  )
}

export default TvShowCard