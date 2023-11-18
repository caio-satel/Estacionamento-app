import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoesFormComponent } from './cartoes-form.component';

describe('CartoesFormComponent', () => {
  let component: CartoesFormComponent;
  let fixture: ComponentFixture<CartoesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartoesFormComponent]
    });
    fixture = TestBed.createComponent(CartoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
