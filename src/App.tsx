import Header from "./components/Header"
import MovieContainer from "./components/Movie/MovieContainer"
import BookContainer from "./components/Book/BookContainer"
import TvShowContainer from "./components/TvShow/TvShowContainer"

function App() {

  return (
    <div className="container">
      <Header />
      <div className="content">
        <MovieContainer />
        <TvShowContainer />
        <BookContainer />
      </div>
    </div>
  )
}

export default App
