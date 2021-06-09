import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from './models/movie.model';
import { ApiMoviesService, MovieContract, IPagination } from '@api';
import { IApiResponse } from '../../../../core/api/interfaces/response.interface';
import { MoviesTranslator } from './translate/movies.translator';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    @Inject(ApiMoviesService) private apiMovies: ApiMoviesService
  ) { }

  getAll(queryParams?: IPagination): Observable<IApiResponse<MovieModel[]>> {
    return this.apiMovies.getAll(queryParams)
      .pipe(
        map((apiRes: IApiResponse<MovieContract[]>) => apiRes)
      );
  }

  get(movieId: number): Observable<MovieModel> {
    return this.apiMovies.get(movieId)
      .pipe(
        map((movie: MovieContract) => MoviesTranslator.translateContractToModel(movie))
      );
  }

  create(movie: MovieModel): Observable<MovieModel> {
    const movieContract: MovieContract = MoviesTranslator.translateModelToContract(movie);
    return this.apiMovies.create(movieContract)
      .pipe(
        map((createdMovie: MovieContract) => MoviesTranslator.translateContractToModel(createdMovie))
      );
  }

  update(movie: MovieModel): Observable<MovieModel> {
    const movieContract: MovieContract = MoviesTranslator.translateModelToContract(movie);
    return this.apiMovies.update(movieContract)
      .pipe(
        map((updatedMovie: MovieContract) => MoviesTranslator.translateContractToModel(updatedMovie))
      );
  }

  delete(movieId: number): Observable<MovieModel> {
    return this.apiMovies.delete(movieId)
      .pipe(
        map((movie: MovieContract) => movie)
      );
  }

}
