import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoesExcluirComponent } from './cartoes-excluir.component';

describe('CartoesExcluirComponent', () => {
  let component: CartoesExcluirComponent;
  let fixture: ComponentFixture<CartoesExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartoesExcluirComponent]
    });
    fixture = TestBed.createComponent(CartoesExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
