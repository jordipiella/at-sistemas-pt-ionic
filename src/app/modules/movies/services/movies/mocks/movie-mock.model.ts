import { GenreEnum } from '@api';

export const  movieMockModel = {
  id: 1,
  title: 'Movie title',
  poster: 'url/poster.jpg',
  genre: [ GenreEnum.action ],
  year: 2001,
  duration: 130,
  imdbRating: 9.2,
  actors: [ 3, 2 ]
};
