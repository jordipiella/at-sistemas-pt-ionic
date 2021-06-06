import { GenreEnum } from '@api';
import { MovieModel } from '../models/movie.model';

export const movieMockModel: MovieModel = {
  id: 1,
  title: 'Movie title',
  poster: 'url/poster.jpg',
  genre: [ GenreEnum.action ],
  year: 2001,
  duration: 130,
  imdbRating: 9.2,
  studio: 'Studio',
  actors: [ 3, 2 ]
};
