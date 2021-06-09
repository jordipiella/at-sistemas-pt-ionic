import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieModel } from '../movies/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesState {

  private _movieSelected: BehaviorSubject<MovieModel> = new BehaviorSubject<MovieModel>(null);
  public movieSelected$: Observable<MovieModel> = this._movieSelected.asObservable();

  constructor() { }

  get movieSelected(): MovieModel {
    return this._movieSelected.value;
  }

  set movieSelected(movie: MovieModel) {
    this._movieSelected.next(movie);
  }


}
