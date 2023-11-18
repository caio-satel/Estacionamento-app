import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoesEditarComponent } from './cartoes-editar.component';

describe('CartoesEditarComponent', () => {
  let component: CartoesEditarComponent;
  let fixture: ComponentFixture<CartoesEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartoesEditarComponent]
    });
    fixture = TestBed.createComponent(CartoesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
