import { TvShow, TvShowResponse } from '../types';
import TvShowCard from './TvShowCard';

type TvShowProps = {
  selectedTvShows: TvShowResponse[];
  onAddToList: (e: any, selectedTvShow:TvShowResponse) => void;
  onRemoveFromList: (e: any, selectedTvShow:TvShowResponse) => void;
};

const SelectedTvShows: React.FC<TvShowProps> = ({ selectedTvShows, onAddToList, onRemoveFromList }) => {
  return (
    <div className="selectedTvShows-container">
      {selectedTvShows.length > 0 ? (<h2>2024 TvShow LIST</h2>) : null}
      <br />
      <div className="tvShow-list">
          {selectedTvShows && selectedTvShows.map((tvShow: Partial<TvShow>, index) => (
            <TvShowCard tvShow={tvShow} key={index} onAddToList={onAddToList} isSelected={true} onRemoveFromList={onRemoveFromList}/>
          ))}
        </div>
    </div>
  )
}

export default SelectedTvShows;