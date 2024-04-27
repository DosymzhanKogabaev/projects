import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviepreviewComponent } from './moviepreview.component';

describe('MoviepreviewComponent', () => {
  let component: MoviepreviewComponent;
  let fixture: ComponentFixture<MoviepreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviepreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviepreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
