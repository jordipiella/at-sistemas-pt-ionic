import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from './movies/movies.service';
import { MovieModel } from './movies/models/movie.model';
import { IPagination } from '../../../core/api/interfaces/pagination.interface';
import { MoviesState } from './movies-state/movies.state';
import { select, Store } from '@ngrx/store';
import { getMovies, resetStateMovies } from '../state/movies.actions';
import { selectMovies, selectTotal, selectLoading } from '../state/movies.selector';

@Injectable({
  providedIn: 'root'
})
export class MoviesFacade {

  allMovies$: Observable<MovieModel[]> = this.store.pipe(select(selectMovies));
  total$: Observable<number> = this.store.pipe(select(selectTotal));
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));

  constructor(
    private moviesService: MoviesService,
    private movieState: MoviesState,
    private store: Store<MoviesState>
  ) { }

  getAllMovies(queryParams?: IPagination): void {
    this.store.dispatch(getMovies(queryParams));
  }


  resetMovies(): void {
    this.store.dispatch(resetStateMovies());
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

  get movieSelected(): MovieModel {
    return this.movieState.movieSelected;
  }

  set movieSelected(movie: MovieModel) {
    this.movieState.movieSelected = movie;
  }

}
