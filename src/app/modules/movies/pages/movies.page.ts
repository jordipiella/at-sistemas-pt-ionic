import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { MovieModel } from '../services/movies/models/movie.model';
import { MoviesFacade } from '../services/movies.facade';
import { catchError, debounceTime, first, tap } from 'rxjs/operators';
import { IPagination } from '../../../core/api/interfaces/pagination.interface';
import { IApiResponse } from '../../../core/api/interfaces/response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  movies: MovieModel[] = [];
  pagination: IPagination = { _page: 1, _limit: 5 };
  total: number;
  loading: boolean = false;

  constructor(
    private moviesFacade: MoviesFacade
  ) { }

  ngOnInit(): void {
    this.getMovies(this.pagination);
  }

  getMovies(queryParams: IPagination): void {
    this.loading = true;
    this.moviesFacade.getAllMovies(queryParams)
      .pipe(
        first(),
        debounceTime(500),
        tap((res: IApiResponse<MovieModel[]>) => this.movies = [...this.movies, ...res.data]),
        tap((res: IApiResponse<MovieModel[]>) => this.setTotal(res?.total)),
        tap(() => this.loading = false),
        catchError((err: HttpErrorResponse) => {
          this.loading = false;
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

}
