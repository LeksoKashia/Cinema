import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.currentIndex = 10;
    this.currentMovie = this.movies[this.currentIndex];
  }

  @Input() movies!: Movie[];

  displayedMovies: Movie[] = [];
  currentMovie!: Movie;
  currentIndex!: number;

  ngOnInit() {
    this.displayedMovies = this.movies.slice(8, 13);
    this.currentIndex = 10;
    this.currentMovie = this.movies[this.currentIndex];
  }

  moveNext() {
    this.currentIndex++;
    if (this.currentIndex == 13) {
      this.currentIndex = 8;
    }
    this.currentMovie = this.movies[this.currentIndex];
    const lastMovie = this.displayedMovies.shift();
    if (lastMovie) {
      this.displayedMovies.push(lastMovie);
    }
  }

  movePrev() {
    this.currentIndex--;
    if (this.currentIndex == 8) {
      this.currentIndex = 13;
    }
    this.currentMovie = this.movies[this.currentIndex];
    const lastMovie = this.displayedMovies.pop();
    if (lastMovie) {
      this.displayedMovies.unshift(lastMovie);
    }
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  handleLeftArrowKey(event: KeyboardEvent) {
    this.movePrev();
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  handleRightArrowKey(event: KeyboardEvent) {
    this.moveNext();
  }
}
