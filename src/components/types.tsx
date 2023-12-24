export type Movie = {
  id: string,
  title: string,
  overview: string,
  vote_average: number,
  poster_path: string,
}

export type MovieResponse = Partial<Movie>;

export type Book = {
  id: string,
  volumeInfo: {
    title: string,
    authors: string[]
    imageLinks: {
      smallThumbnail: string
    }
  }
}

export type BookResponse = Partial<Book>;