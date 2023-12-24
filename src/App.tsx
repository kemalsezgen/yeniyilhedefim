import Header from "./components/Header"
import MovieContainer from "./components/Movie/MovieContainer"
import BookContainer from "./components/Book/BookContainer"

function App() {

  return (
    <div className="container">
      <Header />
      <div className="content">
        <MovieContainer />
        <BookContainer />
      </div>
    </div>
  )
}

export default App
