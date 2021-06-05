import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { MovieModel } from '../services/movies/models/movie.model';
import { MoviesFacade } from '../services/movies.facade';
import { catchError, debounceTime, first, tap } from 'rxjs/operators';
import { IPagination } from '../../../core/api/interfaces/pagination.interface';
import { IApiResponse } from '../../../core/api/interfaces/response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { AppFacade } from '../../../core/services/app.facade';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  movies: MovieModel[] = [];
  pagination: IPagination = { _page: 1, _limit: 5 };
  total: number;
  loading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private moviesFacade: MoviesFacade,
    public appFacade: AppFacade
  ) { }

  ngOnInit(): void {
    this.loadingSubscription();
    this.getMovies(this.pagination);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }

  getMovies(queryParams: IPagination): void {
    this.appFacade.loading = true;
    this.moviesFacade.getAllMovies(queryParams)
      .pipe(
        first(),
        debounceTime(500),
        tap((res: IApiResponse<MovieModel[]>) => this.movies = [...this.movies, ...res.data]),
        tap((res: IApiResponse<MovieModel[]>) => this.setTotal(res?.total)),
        tap(() => this.appFacade.loading = false),
        catchError((err: HttpErrorResponse) => {
          this.appFacade.loading = false;
          return of(err);
        })
      ).subscribe();
  }

  setTotal(total: number): void {
    this.total = (total) ? total : null;
  }

  loadData(event: any): void {
    this.pagination._page += 1;
    this.getMovies(this.pagination);
    event?.target?.complete();
    if (this.movies.length == this.total) {
      event.target.disabled = true;
    }
  }

  loadingSubscription(): void {
    const loadingSubs: Subscription = this.appFacade.loading$
      .pipe(
        tap(x => console.log(x)),
        tap((loading: boolean) => this.setLoading(loading))
      ).subscribe();
    this.subscriptions.push(loadingSubs);
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

}
