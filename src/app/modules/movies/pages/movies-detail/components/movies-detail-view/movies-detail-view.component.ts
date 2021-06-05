import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../../../../services/movies/models/movie.model';



@Component({
  selector: 'app-movies-detail-view',
  templateUrl: './movies-detail-view.component.html',
  styleUrls: ['./movies-detail-view.component.scss'],
})
export class MoviesDetailViewComponent implements OnInit {

  @Input() movie: MovieModel;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
