import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntradaSaidaExcluirComponent } from './registro-entrada-saida-excluir.component';

describe('RegistroEntradaSaidaExcluirComponent', () => {
  let component: RegistroEntradaSaidaExcluirComponent;
  let fixture: ComponentFixture<RegistroEntradaSaidaExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroEntradaSaidaExcluirComponent]
    });
    fixture = TestBed.createComponent(RegistroEntradaSaidaExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
