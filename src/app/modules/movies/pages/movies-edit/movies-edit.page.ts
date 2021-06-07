import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { MovieModel } from '../../services/movies/models/movie.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesFacade } from '../../services/movies.facade';
import { tap, catchError } from 'rxjs/operators';
import { ACTORS, STUDIOS } from '../../../../shared/constants/db.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.page.html',
  styleUrls: ['./movies-edit.page.scss'],
})
export class MoviesEditPage implements OnInit, OnDestroy {
  movieId: string;
  title: string;
  movie: MovieModel;
  loading: boolean = true;
  subscriptions: Subscription[] = [];
  ACTORS: any[] = ACTORS;
  STUDIOS: string[] = STUDIOS;

  constructor(
    private moviesFacade: MoviesFacade,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movieId');
    this.movie = this.moviesFacade.movieSelected;
    this.setTitle(this.movieId);
    if (this.movieId && !this.movie) {
      this.getMovie(this.movieId);
      return;
    }
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.moviesFacade.movieSelected = null;
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }

  setTitle(movieId: string): void {
    const titleString : string = movieId ? 'movies.edit.edit' : 'movies.edit.new';
    this.title = this.translate.instant(titleString);
  }

  goBack(): void {
    this.router.navigate(['../', { relativeTo: this.route }])
  }

  getMovie(movieId: string): void {
    this.loading = true;
    const id: number = movieId ? parseInt(movieId) : null;
    if (!id) return;

    const getSub: Subscription = this.moviesFacade.getMovie(id)
      .pipe(
        tap((movie: MovieModel) => this.setMovie(movie)),
        tap(() => this.loading = false),
        catchError((err: HttpErrorResponse) => {
          this.loading = false;
          return of(err);
        })
      ).subscribe();
    this.subscriptions.push(getSub);
  }

  setMovie(movie: MovieModel): void {
    this.movie = movie;
  }

  submitForm(movie: MovieModel): void {
    if (this.movieId) {
      movie.id = parseInt(this.movieId);
      this.update(movie);
      return;
    }
    this.create(movie);
  }

  create(movie: MovieModel): void {
    const createSub: Subscription = this.moviesFacade.createMovie(movie)
      .pipe(
        tap(() => this.goBack())
      ).subscribe();
    this.subscriptions.push(createSub);
  }

  update(movie: MovieModel): void {
    const updateSub: Subscription = this.moviesFacade.updateMovie(movie)
      .pipe(
        tap(() => this.goBack())
      ).subscribe();
    this.subscriptions.push(updateSub);
  }

}
