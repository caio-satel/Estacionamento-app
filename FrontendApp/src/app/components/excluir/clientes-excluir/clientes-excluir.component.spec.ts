import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesExcluirComponent } from './clientes-excluir.component';

describe('ClientesExcluirComponent', () => {
  let component: ClientesExcluirComponent;
  let fixture: ComponentFixture<ClientesExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesExcluirComponent]
    });
    fixture = TestBed.createComponent(ClientesExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
