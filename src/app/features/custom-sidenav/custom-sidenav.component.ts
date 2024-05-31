import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HomeService } from '../../core/services/key.service';
import { Movie } from '../../shared/models/movie';
import { Observable } from 'rxjs';

export type menuItem = {
  icon: string;
  label: string;
  route?: string;
};

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent implements OnInit {

  favoriteMovies: any[] = [];
  showToast$ = this.homeService.showToast$;
  favoriteMovies$!: Observable<Movie[]>;
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.userData.subscribe((res) => console.log(res)
  )
    this.favoriteMovies$ = this.homeService.userData;
    this.favoriteMovies$.subscribe((res)=>console.log(res))
  }

  dropMovie(id: number) {
    this.homeService.dropData(id);
  }

  menuItems = signal<menuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home',
    },

    {
      icon: 'search',
      label: 'Search',
      route: 'search',
    },

    {
      icon: 'favorite',
      label: 'Favorites',
      route: 'favorites',
    },

    {
      icon: 'video_library',
      label: 'Watchlist',
      route: 'watchlist',
    },
    {
      icon: 'people',
      label: 'contact',
      route: 'contact',
    }
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
