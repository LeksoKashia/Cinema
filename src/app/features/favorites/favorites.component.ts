import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../core/services/key.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { WideMovieCardComponent } from '../../shared/components/wide-movie-card/wide-movie-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { Observable, tap } from 'rxjs';
import { Movie } from '../../shared/models/movie';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    WideMovieCardComponent,
    PaginationComponent,
    RouterModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favoriteMovies$!: Observable<Movie[]>;
  loading$ = this.loaderService.isLoading$;
  currentPage: number = 1;
  moviesPerPage: number = 4;
  totalPages: number = 0;
  movies: Movie[] = [];
  @ViewChild('myFavorites') myFavorites!: ElementRef;

  constructor(
    private homeService: HomeService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.homeService.trendingMovieApiData().subscribe((res) => {
      this.movies = res;
      this.totalPages = Math.ceil(res.length / this.moviesPerPage);
    });

    this.favoriteMovies$ = this.homeService.userData;
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  get paginatedMovies(): Movie[] {
    const startIndex = (this.currentPage - 1) * this.moviesPerPage;
    const endIndex = startIndex + this.moviesPerPage;
    return this.movies.slice(startIndex, endIndex);
  }

  dropMovie(id: number) {
    this.homeService.dropData(id);
  }

  scrollToFavorites() {
    this.myFavorites.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
