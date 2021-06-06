import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MovieModel } from '../../../../services/movies/models/movie.model';
import { MoviesFacade } from '../../../../services/movies.facade';
import { tap } from 'rxjs/operators';



@Component({
  selector: 'app-movies-edit-form',
  templateUrl: './movies-edit-form.component.html',
  styleUrls: ['./movies-edit-form.component.scss'],
})
export class MoviesEditFormComponent implements OnInit {

  @Input() movie: MovieModel;
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private moviesFacade: MoviesFacade
  ) { }

  ngOnInit(): void {
    this.movieForm = this.buildMovieForm();
  }

  buildMovieForm(): FormGroup {
    const form: FormGroup = this.fb.group({
      title: ['', [Validators.required]],
      poster: [''],
      genre: [[]],
      actors: [[]],
      studio: [''],
      year: [''],
      duration: [''],
      score: ['']
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
    this.create(movie);
  }

  create(movie: MovieModel): void {
    this.moviesFacade.createMovie(movie)
      .pipe(
      )
      .subscribe();
  }

}
