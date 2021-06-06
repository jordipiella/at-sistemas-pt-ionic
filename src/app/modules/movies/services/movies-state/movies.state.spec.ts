import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiModule } from '@api';
import { movieMockModel } from '../movies/mocks/movie-mock.model';
import { MovieModel } from '../movies/models/movie.model';
import { MoviesState } from './movies.state';

fdescribe('MoviesState', () => {
  let service: MoviesState;
  const movieModel: MovieModel = movieMockModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ApiModule
      ],
      providers: [

      ]
    });
    service = TestBed.inject(MoviesState);
  });


});
