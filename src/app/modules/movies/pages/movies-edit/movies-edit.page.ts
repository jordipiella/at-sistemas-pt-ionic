import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieModel } from '../../services/movies/models/movie.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesFacade } from '../../services/movies.facade';
import { tap } from 'rxjs/operators';



@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.page.html',
  styleUrls: ['./movies-edit.page.scss'],
})
export class MoviesEditPage implements OnInit, OnDestroy {
  movieId: string;
  title: string;
  movie: MovieModel;
  loading: boolean = false;
  subscriptions: Subscription[] = [];

  STUDIOS: string[] = [
    'Columbia Pictures',
    '20th Century Fox/20th Century Studios',
    'Metro-Goldwyn-Mayer (MGM)">Metro-Goldwyn-Mayer (MGM)',
  ]

  constructor(
    private moviesFacade: MoviesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movieId');
    this.movie = this.moviesFacade.movieSelected;
    if (this.movieId && !this.movie) {
      this.getMovie(this.movieId);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }

  goBack(): void {
    this.router.navigate(['../', { relativeTo: this.route }])
  }

  getMovie(movieId: string): void {
    const id: number = movieId ? parseInt(movieId) : null;
    if (!id) return;

    const getSub: Subscription = this.moviesFacade.getMovie(id)
      .pipe(
        tap((movie: MovieModel) => this.setMovie(movie))
      ).subscribe();
    this.subscriptions.push(getSub);
  }

  setMovie(movie: MovieModel): void {
    this.movie = movie;
  }

  submitForm(movie: MovieModel) {
    if (movie?.id) {
      this.update(movie);
      return;
    }
    this.create(movie);
  }

  create(movie: MovieModel): void {
    const createSub: Subscription = this.moviesFacade.createMovie(movie)
      .pipe(
      )
      .subscribe();
    this.subscriptions.push(createSub);
  }

  update(movie: MovieModel): void {
    const updateSub: Subscription = this.moviesFacade.updateMovie(movie)
      .pipe(
      )
      .subscribe();
    this.subscriptions.push(updateSub);
  }


}
