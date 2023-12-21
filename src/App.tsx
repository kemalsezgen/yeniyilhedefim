import Header from "./components/Header"
import MovieContainer from "./components/Movie/MovieContainer"

function App() {

  return (
    <div className="container">
      <Header />
      <div className="content">
        <MovieContainer />
      </div>
    </div>
  )
}

export default App
