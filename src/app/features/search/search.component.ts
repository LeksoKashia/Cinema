import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiResponse, Movie } from '../../shared/models/movie';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../core/services/loader.service';
import {
  Observable,
  debounceTime,
  delay,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { HomeService } from '../../core/services/key.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MovieCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  /**
   * 1. Create an interface for a movie. ok, use it :D
   * 2. Remake movies to observable, use async pipe.
   */
  searchForm!: FormGroup;
  showResults: boolean = false;

  loading$ = this.loader.isLoading$;

  apiUrl = 'https://api.themoviedb.org/3/movie/popular';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loader: LoaderService,
    private homeService: HomeService
  ) {}

  // ngOnInit(): void {
  //   this.searchForm = this.formBuilder.group({
  //     searchInput: ['']
  //   });
  //   // this.homeService.fetchPopularMovies().subscribe((res) => console.log(res))
  //   // this.movies$.subscribe((res) => console.log(res));
  //   this.onSubmit();
  // }

  movies$!: Observable<Movie[]>;
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });

    this.movies$ = this.searchForm.valueChanges.pipe(
      startWith({ searchInput: '' }),
      debounceTime(300),
      switchMap((value) => this.fetchMovies(value.searchInput))
    );
  }

  private fetchMovies(query: string): Observable<Movie[]> {
    if (query.trim() === '') {
      return this.homeService.fetchPopularMovies();
    }
    return this.http
      .get<ApiResponse<Movie[]>>(
        `https://api.themoviedb.org/3/search/movie?query=${query}`
      )
      .pipe(map((response) => response.results));
  }
}

//not gijivit works
// export class SearchComponent implements OnInit{
//   /**
//    * 1. Create an interface for a movie. ok, use it :D
//    * 2. Remake movies to observable, use async pipe.
//    */
//   searchForm!: FormGroup;
//   showResults: boolean = false;

//   loading$ = this.loader.isLoading$;

//   apiUrl = 'https://api.themoviedb.org/3/movie/popular';
//   constructor(
//     private formBuilder: FormBuilder,
//     private http: HttpClient,
//     private loader: LoaderService,
//     private homeService: HomeService
//   ) { }

//   ngOnInit(): void {
//     this.searchForm = this.formBuilder.group({
//       searchInput: ['']
//     });
//     // this.homeService.fetchPopularMovies().subscribe((res) => console.log(res))
//     // this.movies$.subscribe((res) => console.log(res));
//     this.onSubmit();
//   }

//   movies$!: Observable<Movie[]>;

//   onSubmit() {
//     const searchResult = this.searchForm.value.searchInput;
//     console.log(searchResult);

//     if(this.searchForm.pristine){
//       this.movies$ = this.homeService.fetchPopularMovies();
//     }
//     this.movies$ = this.searchForm.valueChanges.pipe(
//       tap((res) => console.log("leks")),
//       debounceTime(1000),
//       switchMap(value => {
//         console.log("shemo raa");

//         if(value.searchInput == ""){
//           return this.homeService.fetchPopularMovies();
//         }
//         return this.http.get<ApiResponse<Movie[]>>(`https://api.themoviedb.org/3/search/movie?query=${value.searchInput}`).pipe(
//           tap((res)=>console.log(res)
//           ),
//           map((response) => response.results))
//       })
//     )
//   }
// }
