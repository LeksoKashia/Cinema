import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/key.service';
import { LoaderService } from '../../core/services/loader.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../../shared/models/movie';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { FooterComponent } from '../footer/footer.component';
import { SuggestionsComponent } from '../../shared/components/suggestions/suggestions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent,
    CarouselComponent,
    FooterComponent,
    SuggestionsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies!: Movie[];
  loading$ = this.loader.isLoading$;
  moviesResult: any = [];

  movieCategory!: string;
  movieCategoryText!: string;
  selectedOption: string = 'trending';

  constructor(
    private homeService: HomeService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    console.log('axlidan chaitrvirta');

    this.getMovies();
    this.homeService.userData.subscribe((res) => {
      console.log('ganaxlda', res);
    });
  }

  getMovies() {
    this.homeService.trendingMovieApiData().subscribe((result) => {
      this.movieCategory = 'Trending';
      this.movies = result;
    });
  }

  fetchMovie(event: any) {
    console.log(typeof event);
    let category: string;
    let id!: number;

    this.selectedOption = event.target.value;

    if (typeof event == 'string') {
      category = 'trending';
    } else {
      category = event.target.value;
    }

    switch (category) {
      case 'action':
        id = 28;
        this.movieCategory = 'Action';
        this.movieCategoryText =
          'Experience the adrenaline-pumping excitement of action-packed films that will keep you on the edge of your seat. Get ready for intense battles, thrilling stunts, and heart-stopping moments of heroism.';
        break;
      case 'adventure':
        id = 12;
        this.movieCategory = 'Adventure';
        this.movieCategoryText =
          'Embark on epic adventures filled with breathtaking landscapes, daring quests, and unforgettable journeys. Explore uncharted territories and witness the triumph of the human spirit against incredible odds.';
        break;
      case 'animation':
        id = 16;
        this.movieCategory = 'Animation';
        this.movieCategoryText =
          'Immerse yourself in the magical world of animation, where creativity knows no bounds. Enjoy enchanting stories, vibrant characters, and visually stunning animation that captivates audiences of all ages.';
        break;
      case 'comedy':
        id = 35;
        this.movieCategory = 'Comedy';
        this.movieCategoryText =
          'Indulge in laughter and joy with our collection of comedy films. From hilarious comedians to witty scripts, these movies promise to tickle your funny bone and lift your spirits with every scene.';
        break;
      case 'documentary':
        id = 99;
        this.movieCategory = 'Documentary';
        this.movieCategoryText =
          'Gain profound insights into real-life events, diverse cultures, and impactful stories through our documentary films. Explore the depths of human experiences and broaden your understanding of the world.';
        break;
      case 'science':
        id = 878;
        this.movieCategory = 'Science';
        this.movieCategoryText =
          'Embark on a journey of discovery with our science-themed films. Dive into the wonders of the universe, unravel the mysteries of nature, and witness groundbreaking scientific advancements that shape our understanding of the cosmos.';
        break;
      case 'thriller':
        id = 53;
        this.movieCategory = 'Thriller';
        this.movieCategoryText =
          'Feel the suspense and excitement in our collection of thrilling films. Brace yourself for plot twists, unexpected turns, and gripping narratives that will keep you guessing until the very end.';
        break;
      case 'trending':
        this.movieCategory = 'Trending';
        this.movieCategoryText =
          'Explore the latest and hottest films that are currently trending in the world of cinema. Stay ahead of the curve and discover must-watch movies that everyone is talking about.';
        this.homeService.trendingMovieApiData().subscribe((result) => {
          this.movies = result;
          console.log('aq shemovida', result);
        });
        break;
      default:
        break;
    }

    this.homeService.fetchMovies(id).subscribe((result) => {
      console.log('dafetchva', result);
      this.movies = result;
    });
  }
}
