import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MovieDetailsComponent } from './shared/components/movie-details/movie-details.component';
import { SearchComponent } from './features/search/search.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'contact', component: ContactComponent }
];
