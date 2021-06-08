import { createAction, props } from '@ngrx/store';
import { MovieModel } from '../services/movies/models/movie.model';
import { HttpErrorResponse } from '@angular/common/http';

export const getMovies = createAction(
    '[Movies] - get Movies List',
    props<{ _page: number; _limit: number; }>()
);

export const getMoviesSuccess = createAction(
    '[Movies] - get Movies list success',
    props<{ total: number, data: MovieModel[] }>()
);

export const getMoviesFailure = createAction(
    '[Movies] - get Movies list failure',
    props<{ error: HttpErrorResponse }>()
);

export const resetStateMovies = createAction(
    '[Movies] - reset movies data'
);
