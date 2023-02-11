import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdmissionsComponent } from './header-admissions.component';

describe('HeaderAdmissionsComponent', () => {
  let component: HeaderAdmissionsComponent;
  let fixture: ComponentFixture<HeaderAdmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAdmissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
