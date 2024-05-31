import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { GenreMap } from '../../models/genre-map';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../core/services/key.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  favorite!: boolean;

  constructor(private router: Router, private homeService: HomeService) {}

  navigateToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  genres: GenreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  addToFavorites(event: Event, movie: Movie) {
    event.stopPropagation();
    this.homeService.addData(movie);
  }

  onMouseEnter() {
    this.favorite = true;
  }

  onMouseLeave() {
    this.favorite = false;
  }
}
