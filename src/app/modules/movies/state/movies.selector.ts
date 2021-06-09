import { createFeatureSelector, createSelector } from '@ngrx/store';
import { moviesFeatureKey, MoviesState } from './movies.reducer';

const selectMoviesState = createFeatureSelector<MoviesState>(moviesFeatureKey);

export const selectMovies = createSelector(
    selectMoviesState,
    state => state.data
);

export const selectTotal = createSelector(
  selectMoviesState,
  state => state.total
);

export const selectLoading = createSelector(
    selectMoviesState,
    state => state.loading
);
