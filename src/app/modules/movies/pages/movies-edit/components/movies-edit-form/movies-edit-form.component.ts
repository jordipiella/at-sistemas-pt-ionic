import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../../../../services/movies/models/movie.model';



@Component({
  selector: 'app-movies-edit-form',
  templateUrl: './movies-edit-form.component.html',
  styleUrls: ['./movies-edit-form.component.scss'],
})
export class MoviesEditFormComponent implements OnInit {

  @Input() movie: MovieModel;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
