import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from './models/movie.model';
import { ApiMoviesService, MovieContract } from '@api';
import { MoviesModule } from '../../movies.module';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    @Inject(ApiMoviesService) private apiMovies: ApiMoviesService
  ) { }

  getAll(): Observable<MovieModel[]> {
    return this.apiMovies.getAll()
      .pipe(
        map((movies: MovieContract[]) => movies)
      );
  }

  get(movieId: number): Observable<MovieModel> {
    return this.apiMovies.get(movieId)
      .pipe(
        map((movie: MovieContract) => movie)
      );
  }

  create(movie: MovieModel): Observable<MovieModel> {
    return this.apiMovies.create(movie)
      .pipe(
        map((createdMovie: MovieContract) => createdMovie)
      );
  }

  update(movie: MovieModel): Observable<MovieModel> {
    return this.apiMovies.update(movie)
      .pipe(
        map((updatedMovie: MovieContract) => updatedMovie)
      );
  }

  delete(movieId: number): Observable<MovieModel> {
    return this.apiMovies.delete(movieId)
      .pipe(
        map((movie: MovieContract) => movie)
      );
  }

}
