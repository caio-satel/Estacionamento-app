import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoEditarComponent } from './pagamento-editar.component';

describe('PagamentoEditarComponent', () => {
  let component: PagamentoEditarComponent;
  let fixture: ComponentFixture<PagamentoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagamentoEditarComponent]
    });
    fixture = TestBed.createComponent(PagamentoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
