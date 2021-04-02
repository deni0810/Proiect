import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobrequestComponent } from './jobrequest.component';

describe('JobrequestComponent', () => {
  let component: JobrequestComponent;
  let fixture: ComponentFixture<JobrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
