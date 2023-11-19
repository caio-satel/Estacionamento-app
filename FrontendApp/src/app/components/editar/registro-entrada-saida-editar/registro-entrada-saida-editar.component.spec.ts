import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntradaSaidaEditarComponent } from './registro-entrada-saida-editar.component';

describe('RegistroEntradaSaidaEditarComponent', () => {
  let component: RegistroEntradaSaidaEditarComponent;
  let fixture: ComponentFixture<RegistroEntradaSaidaEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroEntradaSaidaEditarComponent]
    });
    fixture = TestBed.createComponent(RegistroEntradaSaidaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
