import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../core/services/key.service';

@Component({
  selector: 'app-wide-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wide-movie-card.component.html',
  styleUrl: './wide-movie-card.component.scss',
})
export class WideMovieCardComponent {
  @Input() movie!: Movie;

  constructor(private homeService: HomeService) {}

  addMovie(movie: Movie) {
    this.homeService.addData(movie);
  }
}
