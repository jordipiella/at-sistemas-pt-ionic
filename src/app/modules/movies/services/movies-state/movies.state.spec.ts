import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiModule } from '@api';
import { movieMockModel } from '../movies/mocks/movie-mock.model';
import { MovieModel } from '../movies/models/movie.model';
import { MoviesState } from './movies.state';

describe('MoviesState', () => {
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

  describe('#set movieSelected', () => {
    it('should call next with movieSelected', () => {
      spyOn(service['_movieSelected'], 'next');
      service.movieSelected = movieModel;
      expect(service['_movieSelected'].next).toHaveBeenCalledWith(movieModel);
    });
  });

  describe('#get movieSelected', () => {
    it('should return movieSelected', () => {
      service.movieSelected = movieModel;
      expect(service.movieSelected).toEqual(movieModel);
    });
  });

});
