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
  @Output() submitForm: EventEmitter<MovieModel> = new EventEmitter<MovieModel>();
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.movieForm = this.buildMovieForm();
  }

  buildMovieForm(): FormGroup {
    const form: FormGroup = this.fb.group({
      title: ['', [Validators.required]],
      poster: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      genre: [[]],
      actors: [[]],
      studio: [''],
      year: [1900, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      duration: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      score: [null, [Validators.required]]
    });
    return form;
  }

  submit(): void {
    this.movieForm.markAllAsTouched();
    if (this.movieForm.invalid) {
      console.error('invaild');
      return;
    }
    const movie: MovieModel = this.movieForm.getRawValue();
    this.submitForm.emit(movie);
  }



}
