import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieContract, ApiModule, movieMockContract, GenreEnum } from '@api';
import { movieMockModel } from './mocks/movie-mock.model';
import { MovieModel } from './models/movie.model';
import { ApiMoviesService } from '../../../../core/api/services/api-movies/api-movies.service';
import { of } from 'rxjs';
import { IApiResponse } from '../../../../core/api/interfaces/response.interface';

describe('MoviesService', () => {
  let service: MoviesService;
  const model: MovieModel = {
    id: 1,
    title: 'Movie title',
    poster: 'url/poster.jpg',
    genre: [ GenreEnum.action ],
    year: 2001,
    duration: 130,
    imdbRating: 9.2,
    studio: 'Studio',
    actors: []
  }

  const contract: MovieContract = {
    id: 1,
    title: 'Movie title',
    poster: 'url/poster.jpg',
    genre: [ GenreEnum.action ],
    year: 2001,
    duration: 130,
    imdbRating: 9.2,
    studio: 'Studio',
    actors: []
  }
  const apiMovies: jasmine.SpyObj<ApiMoviesService> = jasmine.createSpyObj('ApiMoviesService', {
    getAll: of({ total: 5, data: [movieMockContract, movieMockContract, movieMockContract] }),
    get: of(contract),
    create: of(contract),
    update: of(contract),
    delete: of(movieMockContract)
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ApiModule
      ],
      providers: [
        {
          provide: ApiMoviesService, useValue: apiMovies
        }
      ]
    });
    service = TestBed.inject(MoviesService);
  });

  describe('#getAll()', () => {
    it('should call apiMovies.getAll and return a Observable<IApiResponse<MovieModel[]>>', () => {
      service.getAll()
        .subscribe((res: IApiResponse<MovieModel[]>) => {
          expect(res.data).toEqual([movieMockContract, movieMockContract, movieMockContract]);
        });
      expect(apiMovies.getAll).toHaveBeenCalled();
    });
  });

  describe('#get()', () => {
    it('should call apiMovies.get and return a Observable<MovieModel> by Id', () => {
      service.get(model.id)
        .subscribe((movie: MovieModel) => {
          expect(movie).toEqual(model);
        });
        expect(apiMovies.get).toHaveBeenCalledWith(model.id);
    });
  });

  describe('#create()', () => {
    it('should call apiMovies.create and return a Observable<MovieModel>', () => {
      service.create(model)
        .subscribe((movie: MovieModel) => {
          expect(movie).toEqual(model);
        });
        expect(apiMovies.create).toHaveBeenCalledWith(model);
      });
  });

  describe('#update()', () => {
    it('should call apiMovies.update url and return a new movie as Observable<MovieModel>', () => {

      service.update(model)
        .subscribe((movie: MovieModel) => {
          expect(movie).toEqual(model);
        });
        expect(apiMovies.update).toHaveBeenCalledWith(model);
      });
  });

  describe('#delete()', () => {
    it('should call apiMovies.delete url and return a Observable<MovieModel>', () => {
      service.delete(movieMockModel.id).subscribe(
        (movie: MovieContract) => {
          expect(movie).toEqual(movieMockContract);
        }
      );
      expect(apiMovies.delete).toHaveBeenCalledWith(movieMockModel.id);
      });
  });

});
