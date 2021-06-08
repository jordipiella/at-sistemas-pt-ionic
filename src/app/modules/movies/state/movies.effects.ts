import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { MoviesService } from '../services/movies/movies.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getMoviesSuccess, getMoviesFailure, getMovies } from './movies.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponse } from '../../../core/api/interfaces/response.interface';
import { MovieModel } from '../services/movies/models/movie.model';


@Injectable()
export class MoviesEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(getMovies),
    exhaustMap((pagination) => this.moviesService.getAll(pagination)
      .pipe(
        map((res: IApiResponse<MovieModel[]>) => getMoviesSuccess(res)),
        catchError((err: HttpErrorResponse) => of(getMoviesFailure({ error: err })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}



