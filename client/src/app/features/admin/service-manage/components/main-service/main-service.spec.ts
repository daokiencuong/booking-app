import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainService } from './main-service';

describe('MainService', () => {
  let component: MainService;
  let fixture: ComponentFixture<MainService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
