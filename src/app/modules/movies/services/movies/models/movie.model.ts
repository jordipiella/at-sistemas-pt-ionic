import { GenreEnum } from '@api';

export class MovieModel {
  id?: number;
  title: string;
  poster: string;
  genre: GenreEnum[];
  year: number;
  duration: number;
  imdbRating: number;
  actors: number[];
}
