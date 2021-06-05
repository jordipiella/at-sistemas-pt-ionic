import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from './movies/movies.service';
import { MovieModel } from './movies/models/movie.model';
import { IPagination } from '../../../core/api/interfaces/pagination.interface';
import { IApiResponse } from '../../../core/api/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesFacade {

  constructor(
    private moviesService: MoviesService
  ) { }

  getAllMovies(queryParams?: IPagination): Observable<IApiResponse<MovieModel[]>> {
    return this.moviesService.getAll(queryParams);
  }

  getMovie(movieId: number): Observable<MovieModel> {
    return this.moviesService.get(movieId);
  }

  createMovie(movie: MovieModel): Observable<MovieModel> {
    return this.moviesService.create(movie);
  }

  updateMovie(movie: MovieModel): Observable<MovieModel> {
    return this.moviesService.update(movie);
  }

  deleteMovie(movieId: number): Observable<MovieModel> {
    return this.moviesService.delete(movieId);
  }

}
