import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieModel } from '../../services/movies/models/movie.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesFacade } from '../../services/movies.facade';


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

  constructor(
    private moviesFacade: MoviesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }

  goBack(): void {
    this.router.navigate(['../', { relativeTo: this.route }])
  }

  create(movie: MovieModel): void {
    this.moviesFacade.createMovie(movie)
      .pipe(
      )
      .subscribe();
  }


}
