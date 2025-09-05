import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyScrambleComponent } from './daily-scramble.component';

describe('Daily', () => {
  let component: DailyScrambleComponent;
  let fixture: ComponentFixture<DailyScrambleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyScrambleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyScrambleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
