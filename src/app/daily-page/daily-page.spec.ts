import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPage } from './daily-page';

describe('DailyPage', () => {
  let component: DailyPage;
  let fixture: ComponentFixture<DailyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
