import { Component, computed, inject, signal } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './features/custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'InternshipProject';

  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px': '250px')
  // loader = inject(LoaderService)
  // loading$ = this.loader.isLoading$;
  // constructor() {
  //   this.loader.isLoading$.subscribe(res => console.log(res));
  // }
}
