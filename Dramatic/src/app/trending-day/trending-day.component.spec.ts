import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingDayComponent } from './trending-day.component';

describe('TrendingDayComponent', () => {
  let component: TrendingDayComponent;
  let fixture: ComponentFixture<TrendingDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
