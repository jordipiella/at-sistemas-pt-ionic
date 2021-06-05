import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ApiMoviesService } from './api-movies.service';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../../environments/environment';
import { API_URL_MOVIES } from '../../constants/api-url.constants';
import { MovieContract } from './contracts/movie.contract';
import { movieMockContract } from './contracts/movie-mock.contract';

describe('ApiMoviesService', () => {
  let service: ApiMoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiMoviesService
      ]
    });
    service = TestBed.inject(ApiMoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAll()', () => {
    it('should call correct url and return a Observable<MovieContract[]>', () => {
      let result: MovieContract[];
      service.getAll().subscribe((movies: MovieContract[]) => result = movies);
      const req: TestRequest = httpMock.expectOne(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }`);
      expect(req.request.method).toBe('GET');
      req.flush([movieMockContract]);
      expect(result[0]).toEqual(movieMockContract);
    });
  });

  describe('#get()', () => {
    it('should call correct url and return a Observable<MovieContract> by Id', () => {
      const id = movieMockContract.id;
      let result: MovieContract;
      service.get(id).subscribe((movie: MovieContract) => result = movie);
      const req: TestRequest = httpMock.expectOne(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }/${ id }`);
      expect(req.request.method).toBe('GET');
      req.flush(movieMockContract);
      expect(result.id).toEqual(movieMockContract.id);
      expect(result).toEqual(movieMockContract);
    });
  });

  describe('#create()', () => {
    it('should call correct url and return a new movie as Observable<MovieContract>', () => {
      let result: MovieContract;
      const newMovie: MovieContract = { ...movieMockContract };
      newMovie.title = 'New movie title';
      delete newMovie.id;
      service.create(newMovie).subscribe((movie: MovieContract) => result = movie);
      const req: TestRequest = httpMock.expectOne(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }`);
      expect(req.request.method).toBe('POST');
      req.flush(newMovie);
      expect(result.title).toEqual(newMovie.title);
      expect(result).toEqual(newMovie);
    });
  });

  describe('#update()', () => {
    it('should call correct url and return a updated movie: Observable<MovieContract>', () => {
      let result: MovieContract;
      const toUpdateMovie: MovieContract = { ...movieMockContract };
      toUpdateMovie.title = 'Updated movie title';

      service.update(toUpdateMovie).subscribe((movie: MovieContract) => result = movie);
      const req: TestRequest = httpMock.expectOne(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }/${ toUpdateMovie.id }`);
      expect(req.request.method).toBe('PUT');
      req.flush(toUpdateMovie);
      expect(result.title).toEqual(toUpdateMovie.title);
      expect(result).toEqual(toUpdateMovie);
    });
  });

  describe('#delete()', () => {
    it('should call correct url and return a Observable<MovieContract>', () => {
      let result: MovieContract;
      service.delete(movieMockContract.id).subscribe((movie: MovieContract) => result = movie);
      const req: TestRequest = httpMock.expectOne(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }/${ movieMockContract.id }`);
      expect(req.request.method).toBe('DELETE');
      req.flush(movieMockContract);
      expect(result.id).toEqual(movieMockContract.id);
      expect(result).toEqual(movieMockContract);
    });
  });

});
