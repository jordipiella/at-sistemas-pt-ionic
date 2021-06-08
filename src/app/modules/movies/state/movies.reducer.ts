import { createReducer, on } from '@ngrx/store';
import * as moviesAction from './movies.actions';
import { MovieModel } from '../services/movies/models/movie.model';
import { HttpErrorResponse } from '@angular/common/http';

export const moviesFeatureKey = 'movies';

export interface MoviesState {
    data: MovieModel[];
    total: number,
    loading: boolean;
    error: HttpErrorResponse;
}

const initialState: MoviesState = {
    data: [],
    total: null,
    loading: false,
    error: null
};

export const reducer = createReducer(
    initialState,
    on(moviesAction.getMovies, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(moviesAction.getMoviesSuccess, (state, action) => {
        return {
            ...state,
            data: [...action.data],
            total: action.total,
            loading: false
        };
    }),
    on(moviesAction.getMoviesFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }),
    on(moviesAction.resetStateMovies, (state, action) => {
        return initialState;
    })
);
