import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosExcluirComponent } from './funcionarios-excluir.component';

describe('FuncionariosExcluirComponent', () => {
  let component: FuncionariosExcluirComponent;
  let fixture: ComponentFixture<FuncionariosExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionariosExcluirComponent]
    });
    fixture = TestBed.createComponent(FuncionariosExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
