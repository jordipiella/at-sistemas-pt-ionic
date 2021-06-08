import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonInfiniteScroll } from '@ionic/angular';
import { MovieModel } from '../../services/movies/models/movie.model';
import { MoviesFacade } from '../../services/movies.facade';
import { catchError, debounceTime, tap } from 'rxjs/operators';
import { IPagination } from '../../../../core/api/interfaces/pagination.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Subscription, Observable } from 'rxjs';
import { AppFacade } from '../../../../core/services/app.facade';
import { Router } from '@angular/router';
import { Animation } from '@ionic/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss']
})
export class MoviesPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  movies: MovieModel[] = [];
  pagination: IPagination = { _page: 1, _limit: 5 };
  total: number;
  loading: Observable<boolean> = this.moviesFacade.loading$;
  subscriptions: Subscription[] = [];

  constructor(
    public moviesFacade: MoviesFacade,
    public appFacade: AppFacade,
    private router: Router,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter(): void {
    this.movies = [];
    this.pagination = { _page: 1, _limit: 5 };
    this.getMovies(this.pagination);
    const mSubs: Subscription = this.moviesFacade.allMovies$
      .pipe(
        debounceTime(500),
        tap((res: MovieModel[]) => this.movies = [...this.movies, ...res]),
        tap(() => this.playAnimation(this.createAnimation())),
        tap(() => this.appFacade.loading = false),
        catchError((err: HttpErrorResponse) => {
          this.appFacade.loading = false;
          return of(err);
        })
      ).subscribe();
    this.subscriptions.push(mSubs);

    const totalSub: Subscription = this.moviesFacade.total$
      .pipe(
        tap((x) => console.log(x)),
        tap((total: number) => this.setTotal(total))
      ).subscribe();
    this.subscriptions.push(totalSub);
  }

  ionViewDidLeave(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe);
  }

  getMovies(queryParams: IPagination): void {
    this.moviesFacade.getAllMovies(queryParams);

  }

  playAnimation(animation: Animation): void {
    animation.play();
  }

  createAnimation(): Animation {
    const animation: Animation = this.animationCtrl.create()
      .addElement(this.container.nativeElement)
      .duration(500)
      .fromTo('opacity', '0', '1');
    return animation;
  }

  setTotal(total: number): void {
    this.total = (total) ? total : null;
  }

  loadData(event: any): void {
    if (this.movies.length < this.total) {
      this.pagination._page += 1;
      this.getMovies(this.pagination);
    }
    event?.target?.complete();
  }


  goToDetailPage(movie: MovieModel): void {
    if (!movie?.id) {
      return;
    }
    this.router.navigate([`movies/${ movie.id }`]);
  }

  goToAddMovie(): void {
    this.router.navigate(['movies/new']);
  }

}
