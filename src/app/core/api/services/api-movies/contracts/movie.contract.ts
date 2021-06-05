import { GenreEnum } from '../../../enums/genre.enum';

export class MovieContract {
  id?: number;
  title: string;
  poster: string;
  genre: GenreEnum[];
  year: number;
  duration: number;
  imdbRating: number;
  actors: number[];
}
