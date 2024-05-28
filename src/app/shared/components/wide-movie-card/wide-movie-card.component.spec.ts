import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WideMovieCardComponent } from './wide-movie-card.component';

describe('WideMovieCardComponent', () => {
  let component: WideMovieCardComponent;
  let fixture: ComponentFixture<WideMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WideMovieCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WideMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
