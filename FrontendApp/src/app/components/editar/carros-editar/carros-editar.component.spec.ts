import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosEditarComponent } from './carros-editar.component';

describe('CarrosEditarComponent', () => {
  let component: CarrosEditarComponent;
  let fixture: ComponentFixture<CarrosEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrosEditarComponent]
    });
    fixture = TestBed.createComponent(CarrosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
