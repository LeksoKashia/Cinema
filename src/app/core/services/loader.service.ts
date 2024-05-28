import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading$ = new BehaviorSubject<boolean>(true);

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 1000);
  }
}
