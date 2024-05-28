import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../core/services/key.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;

  constructor(private service: HomeService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((movie) => {
      console.log(movie, 'getmoviedetails#');
      this.movie = movie;
    });
  }
}
