import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieContract } from './contracts/movie.contract';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { API_URL_MOVIES } from '../../../services/language/constants/api-url.constants';
import { IPagination } from '../../interfaces/pagination.interface';
import { IApiResponse } from '../../interfaces/response.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiMoviesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(queryParams?: IPagination): Observable<IApiResponse<MovieContract[]>> {
    const params: HttpParams = new HttpParams({
      fromObject: { ...queryParams }
    });
    return this.http.get(`${ environment.apiMoviesUrl }/${ API_URL_MOVIES }`, { params, observe: 'response' })
      .pipe(
        map((res: HttpResponse<MovieContract>) => this.httpResToApiResponse(res))
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

  httpResToApiResponse(res: HttpResponse<any>): IApiResponse<any> {
    const total: string =res?.headers?.get('X-Total-Count');
    const apiRes: IApiResponse<any> = {
      total: total ? parseInt(total) : null,
      data: res.body
    };
    return apiRes;
  }

}
