import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieContract, ApiModule, movieMockContract } from '@api';
import { movieMockModel } from './mocks/movie-mock.model';
import { MovieModel } from './models/movie.model';
import { ApiMoviesService } from '../../../../core/api/services/api-movies/api-movies.service';
import { of } from 'rxjs';
import { IApiResponse } from '../../../../core/api/interfaces/response.interface';

describe('MoviesService', () => {
  let service: MoviesService;

  const movieContrat: MovieContract = movieMockContract;

  const movieModel: MovieModel = movieMockModel;

  const apiMovies: jasmine.SpyObj<ApiMoviesService> = jasmine.createSpyObj('ApiMoviesService', {
    getAll: of([movieContrat, movieContrat, movieContrat]),
    get: of(movieContrat),
    create: of(movieContrat),
    update: of(movieContrat),
    delete: of(movieContrat)
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
          expect(res.data).toEqual([movieModel, movieModel, movieModel]);
        });
      expect(apiMovies.getAll).toHaveBeenCalled();
    });
  });

  describe('#get()', () => {
    it('should call apiMovies.get and return a Observable<MovieModel> by Id', () => {
      service.get(movieModel.id)
        .subscribe((movie: MovieModel) => {
          expect(movie).toEqual(movieModel);
        });
        expect(apiMovies.get).toHaveBeenCalledWith(movieModel.id);
    });
  });

  describe('#create()', () => {
    it('should call apiMovies.create and return a Observable<MovieModel>', () => {
      service.create(movieModel)
        .subscribe((movie: MovieModel) => {
          expect(movie).toEqual(movieModel);
        });
        expect(apiMovies.create).toHaveBeenCalledWith(movieModel);
      });
  });

  describe('#update()', () => {
    it('should call apiMovies.update url and return a new movie as Observable<MovieModel>', () => {
      service.update(movieModel)
        .subscribe((movie: MovieModel) => {
          expect(movie).toEqual(movieModel);
        });
        expect(apiMovies.update).toHaveBeenCalledWith(movieModel);
      });
  });

  describe('#delete()', () => {
    it('should call apiMovies.delete url and return a Observable<MovieModel>', () => {
      service.delete(movieModel.id).subscribe(
        (movie: MovieModel) => {
          expect(movie).toEqual(movieModel);
        }
      );
        expect(apiMovies.delete).toHaveBeenCalledWith(movieModel.id);
      });
  });

});
