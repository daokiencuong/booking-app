import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttChart } from './gantt-chart';

describe('GanttChart', () => {
  let component: GanttChart;
  let fixture: ComponentFixture<GanttChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanttChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
