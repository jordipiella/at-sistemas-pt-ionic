import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { catchError, first, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { MovieModel } from '../../services/movies/models/movie.model';
import { MoviesFacade } from '../../services/movies.facade';
import { AppFacade } from '../../../../core/services/app.facade';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.page.html',
  styleUrls: ['./movies-detail.page.scss'],
})
export class MoviesDetailPage implements OnInit, OnDestroy {

  title: string;
  movieId: number;
  movie: MovieModel;
  loading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private moviesFacade: MoviesFacade,
    public appFacade: AppFacade,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadingSubscription();
    this.movieId = this.getMovieId();
    this.getMovie(this.movieId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }

  getMovieId(): number {
    const movieId: string = this.route.snapshot.paramMap.get('movieId');
    console.log(movieId)
    if (!movieId) {
      this.router.navigate(['../'], { relativeTo: this.route })
      return null;
    }
    return parseInt(movieId);
  }

  getMovie(movieId: number): void {
    this.appFacade.loading = true;
    this.moviesFacade.getMovie(movieId)
      .pipe(
        first(),
        tap((movie: MovieModel) => this.movie = movie),
        tap(() => this.appFacade.loading = false),
        catchError((err: HttpErrorResponse) => {
          this.appFacade.loading = false;
          return of(err);
        })
      ).subscribe();
  }

  loadingSubscription(): void {
    const loadingSubs: Subscription = this.appFacade.loading$
      .pipe(
        tap((loading: boolean) => this.setLoading(loading))
      ).subscribe();
    this.subscriptions.push(loadingSubs);
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
