export type Movie = {
  title: string,
  overview: string,
  vote_average: number,
  poster_path: string
}

export type MovieResponse = Partial<Movie>;