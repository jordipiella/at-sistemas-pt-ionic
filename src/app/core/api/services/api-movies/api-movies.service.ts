import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieContract } from './contracts/movie.contract';
import { HttpClient } from '@angular/common/http';
import { API_URL_MOVIES } from '../../../services/language/constants/api-url.constants';

@Injectable({
    providedIn: 'root'
})
export class ApiMoviesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<MovieContract[]> {
    return this.http.get(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }`)
      .pipe(
        map((movies: MovieContract[]) => movies)
      );
  }

  get(movieId: number): Observable<MovieContract> {
    return this.http.get(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }/${ movieId }`)
      .pipe(
        map((movie: MovieContract) => movie)
      );
  }

  create(movie: MovieContract): Observable<MovieContract> {
    return this.http.post(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }`, movie)
      .pipe(
        map((createdMovie: MovieContract) => createdMovie)
      );
  }

  update(movie: MovieContract): Observable<MovieContract> {
    return this.http.put(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }/${ movie.id }`, movie)
      .pipe(
        map((updatedMovie: MovieContract) => updatedMovie)
      );
  }

  delete(movieId: number): Observable<MovieContract> {
    return this.http.delete(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }/${ movieId }`)
      .pipe(
        map((movie: MovieContract) => movie)
      );
  }

}
