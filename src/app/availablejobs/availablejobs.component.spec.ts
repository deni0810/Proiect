import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablejobsComponent } from './availablejobs.component';

describe('AvailablejobsComponent', () => {
  let component: AvailablejobsComponent;
  let fixture: ComponentFixture<AvailablejobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablejobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
