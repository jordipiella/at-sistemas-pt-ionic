import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieModel } from '../../../../services/movies/models/movie.model';


@Component({
  selector: 'app-movies-edit-form',
  templateUrl: './movies-edit-form.component.html',
  styleUrls: ['./movies-edit-form.component.scss'],
})
export class MoviesEditFormComponent implements OnInit {

  @Input() movie: MovieModel;
  @Input() studios: string[] = [];
  @Input() actors: any[] = [];
  @Output() submitForm: EventEmitter<MovieModel> = new EventEmitter<MovieModel>();
  movieForm: FormGroup;
  movieId: string;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.movieForm = this.buildMovieForm(this.movie);
  }

  buildMovieForm(movie?: MovieModel): FormGroup {
    const form: FormGroup = this.fb.group({
      title: [
        (movie?.title) ? movie.title : '',
        [ Validators.required ]
      ],
      poster: [
        (movie?.poster) ? movie.poster : '',
        [ Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]
      ],
      genre: [
        (movie?.genre?.length) ? movie.genre : [],
        Validators.required
      ],
      actors: [
        (movie?.actors?.length) ? movie.actors : [],
        Validators.required
      ],
      studio: [
        (movie?.studio) ? movie.studio : null
      ],
      year: [
        (movie?.year) ? movie.year : 1900,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.min(1000),
          Validators.max(9999)
        ]
      ],
      duration: [
        (movie?.duration) ? movie.duration : 0,
        [
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ]
      ],
      imdbRating: [
        (movie?.imdbRating) ? movie.imdbRating : null,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10)
        ]
      ]
    });
    return form;
  }

  submit(): void {
    this.movieForm.markAllAsTouched();
    if (this.movieForm.invalid) {
      console.error('invaild');
      return;
    }
    let movie: MovieModel = this.movieForm.getRawValue();
    if (this.movieId) movie.id = parseInt(this.movieId);
    this.submitForm.emit(movie);
  }



}
