import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GantChart } from './gant-chart';

describe('GantChart', () => {
  let component: GantChart;
  let fixture: ComponentFixture<GantChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GantChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GantChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
