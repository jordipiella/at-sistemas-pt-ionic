import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MoviesDetailPage } from './movies-detail.page';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesFacade } from '../../services/movies.facade';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../../../../core/header/header.component';
import { SwitchLanguageComponent } from 'src/app/core/switch-language/switch-language.component';
import { AppFacade } from '../../../../core/services/app.facade';
import { movieMockModel } from '../../services/movies/mocks/movie-mock.model';

describe('MoviesDetailPage', () => {
  let component: MoviesDetailPage;
  let fixture: ComponentFixture<MoviesDetailPage>;
  let appfacade: AppFacade;
  let moviesFacade: MoviesFacade;
  let translate: TranslateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoviesDetailPage,
        HeaderComponent,
        SwitchLanguageComponent
      ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot()
      ],
      providers: [
        MoviesFacade,
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue:  {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesDetailPage);
    appfacade = TestBed.inject(AppFacade);
    moviesFacade = TestBed.inject(MoviesFacade);
    translate = TestBed.get(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('#ngOnInit', () => {
    it('should call loadingSubscription, getMovieId and getMovie', () => {
      spyOn(component, 'loadingSubscription');
      spyOn(component, 'getMovieId').and.returnValue(1);
      spyOn(component, 'getMovie');
      component.ngOnInit();
      expect(component.loadingSubscription).toHaveBeenCalled();
      expect(component.getMovieId).toHaveBeenCalled();
      expect(component.getMovie).toHaveBeenCalledOnceWith(1);
    });
  });

  describe('#ngOnDestroy', () => {
    it('should call unsubscribe', () => {
      component.subscriptions = [of().subscribe()];
      spyOn(component.subscriptions[0], 'unsubscribe');

      component.ngOnDestroy();
      expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('#getMovieId', () => {
    it('should return id', () => {
      expect(component.getMovieId()).toEqual(1);
    });
  });

  describe('#getMovie', () => {
    it('should set movie and call movieSelected and loading', () => {
      component.movie = null;
      const loadingSpy: jasmine.Spy = spyOnProperty(appfacade, 'loading', 'set');
      spyOn(moviesFacade, 'getMovie').and.returnValue(of(movieMockModel));
      const movieSelSpy: jasmine.Spy = spyOnProperty(moviesFacade, 'movieSelected', 'set');
      component.getMovie(1);
      expect(component.movie).toEqual(movieMockModel);
      expect(loadingSpy).toHaveBeenCalledTimes(2);
      expect(movieSelSpy).toHaveBeenCalled();
    });
    it('should call loading and not set movie', () => {
      component.movie = null;
      const loadingSpy: jasmine.Spy = spyOnProperty(appfacade, 'loading', 'set');
      spyOn(moviesFacade, 'getMovie').and.returnValue(throwError({ status: 500}));
      const movieSelSpy: jasmine.Spy = spyOnProperty(moviesFacade, 'movieSelected', 'set');
      component.getMovie(1);
      expect(component.movie).toEqual(null);
      expect(loadingSpy).toHaveBeenCalledTimes(2);
      expect(movieSelSpy).not.toHaveBeenCalled();
    });
  });

  describe('#loadingSubscription', () => {
    it('should call setLoading', () => {
      spyOnProperty(appfacade, 'loading$', 'get').and.returnValue(of(true));
      spyOn(component, 'setLoading');
      component.loadingSubscription();
      expect(component.setLoading).toHaveBeenCalledWith(true);
    });
  });

  describe('#setLoading', () => {
    it('should set loading', () => {
      component.setLoading(false);
      expect(component.loading).toBeFalsy();
    });
  });

  describe('#goBack', () => {
    it('should call navigate', () => {
      const router: Router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      component.goBack();
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('#goToEdit', () => {
    it('should call navigate', () => {
      const router: Router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      component.goBack();
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('#deleteMovie', () => {
    it('should call deleteMovie, successToast, translate.instant and GoBack', () => {
      spyOn(moviesFacade, 'deleteMovie').and.returnValue(of(movieMockModel));
      spyOn(appfacade, 'successToast');
      spyOn(translate, 'instant').and.returnValue('success');
      spyOn(component, 'goBack');
      component.deleteMovie(1);
      expect(moviesFacade.deleteMovie).toHaveBeenCalledWith(1);
      expect(appfacade.successToast).toHaveBeenCalledWith('success');
      expect(translate.instant).toHaveBeenCalledWith('toast.deletedSuccess');
      expect(component.goBack).toHaveBeenCalled();
    });
  });
});
