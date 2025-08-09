import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManage } from './service-manage';

describe('ServiceManage', () => {
  let component: ServiceManage;
  let fixture: ComponentFixture<ServiceManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceManage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
