import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifariosFormComponent } from './tarifarios-form.component';

describe('TarifariosFormComponent', () => {
  let component: TarifariosFormComponent;
  let fixture: ComponentFixture<TarifariosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifariosFormComponent]
    });
    fixture = TestBed.createComponent(TarifariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
