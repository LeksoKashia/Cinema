import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ApiResponse, Movie } from '../../shared/models/movie';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseurl = 'https://api.themoviedb.org/3';
  favoriteMovies$ = new BehaviorSubject<Movie[]>(this.getFavoriteMoviesFromLocalStorage());
  showToast$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  show() {
    this.showToast$.next(true);
    setTimeout(() => {
      this.hide();
    }, 500);
  }

  hide() {
    this.showToast$.next(false);
  }

  userData = this.favoriteMovies$.asObservable();

  updateUserData(data: any) {
    this.favoriteMovies$.next(data);
    this.saveFavoriteMoviesToLocalStorage(data);
  }

  addData(dataObj: Movie) {
    const currentValue = this.favoriteMovies$.value;
    const movieExists = currentValue.some((movie) => movie.id === dataObj.id);

    if (movieExists) {
      this.showSuccessToast('Movie is already in favorites.', 'red-snackbar');
    } else {
      const updatedValue = [...currentValue, dataObj];
      this.favoriteMovies$.next(updatedValue);
      this.saveFavoriteMoviesToLocalStorage(updatedValue);
      this.showSuccessToast('Movie added to favorites successfully!', 'green-snackbar');
    }
  }

  dropData(movieId: number) {
    const currentValue = this.favoriteMovies$.value;
    const updatedValue = currentValue.filter((movie) => movie.id !== movieId);
    if (currentValue.length === updatedValue.length) {
      this.showSuccessToast('Movie not found in favorites.', 'red-snackbar');
    } else {
      this.favoriteMovies$.next(updatedValue);
      this.saveFavoriteMoviesToLocalStorage(updatedValue);
      this.showSuccessToast('Movie removed from favorites successfully!', 'green-snackbar');
    }
  }

  showSuccessToast(message: string, panelClass: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }

  fetchPopularMovies(): Observable<Movie[]> {
    return this.http
      .get<ApiResponse<Movie[]>>(`https://api.themoviedb.org/3/movie/popular`)
      .pipe(
        tap((res) => console.log(res)),
        map((response) => response.results)
      );
  }

  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/movie/day`).pipe(
      tap((response: any) => console.log(response)),
      map((response: any) => response.results)
    );
  }

  getMovieDetails(data: Movie): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${data}`);
  }

  fetchMovies(id: number): Observable<any> {
    return this.http
      .get(`${this.baseurl}/discover/movie?with_genres=${id}`)
      .pipe(map((response: any) => response.results));
  }

  private saveFavoriteMoviesToLocalStorage(movies: Movie[]) {
    if (this.isBrowser()) {
      localStorage.setItem('favoriteMovies', JSON.stringify(movies));
    }
  }

  private getFavoriteMoviesFromLocalStorage(): Movie[] {
    if (this.isBrowser()) {
      const movies = localStorage.getItem('favoriteMovies');
      return movies ? JSON.parse(movies) : [];
    }
    return [];
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
