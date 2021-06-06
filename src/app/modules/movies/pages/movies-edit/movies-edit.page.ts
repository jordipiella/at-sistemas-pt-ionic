import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieModel } from '../../services/movies/models/movie.model';


@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.page.html',
  styleUrls: ['./movies-edit.page.scss'],
})
export class MoviesEditPage implements OnInit, OnDestroy {

  title: string;
  movie: MovieModel;
  loading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }


}
