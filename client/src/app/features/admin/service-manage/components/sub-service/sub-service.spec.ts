import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubService } from './sub-service';

describe('SubService', () => {
  let component: SubService;
  let fixture: ComponentFixture<SubService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
