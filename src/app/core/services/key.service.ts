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
  favoritesArray$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  // getMovies(): Observable<Movie[]> {
  //   return this.http.get<any>("https://api.themoviedb.org/3/discover/movie?append_to_response=videos,images").pipe(
  //     map((response: any) => response.results)
  //   );
  // }

  userDataSource = new BehaviorSubject<Movie[]>([]);
  showToast$ = new BehaviorSubject<boolean>(false);

  show() {
    this.showToast$.next(true);
    setTimeout(() => {
      this.hide();
    }, 500);
  }

  hide() {
    this.showToast$.next(false);
  }

  userData = this.userDataSource.asObservable();

  updateUserData(data: any) {
    this.userDataSource.next(data);
  }

  addData(dataObj: Movie) {
    const currentValue = this.userDataSource.value;
    const movieExists = currentValue.some((movie) => movie.id === dataObj.id);

    if (movieExists) {
      this.showSuccessToast('Movie is already in favorites.', 'red-snackbar');
    } else {
      const updatedValue = [...currentValue, dataObj];
      this.userDataSource.next(updatedValue);
      this.showSuccessToast(
        'Movie added to favorites successfully!',
        'green-snackbar'
      );
    }
  }

  dropData(movieId: number) {
    const currentValue = this.userDataSource.value;
    const updatedValue = currentValue.filter((movie) => movie.id !== movieId);
    if (currentValue.length === updatedValue.length) {
      this.showSuccessToast('Movie not found in favorites.', 'red-snackbar');
    } else {
      this.userDataSource.next(updatedValue);
      this.showSuccessToast(
        'Movie removed from favorites successfully!',
        'green-snackbar'
      );
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
        tap((res) => console.log(res)
        ),
        map((response) => response.results));
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
}
