import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosEditarComponent } from './funcionarios-editar.component';

describe('FuncionariosEditarComponent', () => {
  let component: FuncionariosEditarComponent;
  let fixture: ComponentFixture<FuncionariosEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionariosEditarComponent]
    });
    fixture = TestBed.createComponent(FuncionariosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
