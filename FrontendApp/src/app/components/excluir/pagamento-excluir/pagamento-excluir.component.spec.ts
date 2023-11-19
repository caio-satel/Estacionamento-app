import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoExcluirComponent } from './pagamento-excluir.component';

describe('PagamentoExcluirComponent', () => {
  let component: PagamentoExcluirComponent;
  let fixture: ComponentFixture<PagamentoExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagamentoExcluirComponent]
    });
    fixture = TestBed.createComponent(PagamentoExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
