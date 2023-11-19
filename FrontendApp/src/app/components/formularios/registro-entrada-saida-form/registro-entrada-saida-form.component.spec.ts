import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntradaSaidaFormComponent } from './registro-entrada-saida-form.component';

describe('RegistroEntradaSaidaFormComponent', () => {
  let component: RegistroEntradaSaidaFormComponent;
  let fixture: ComponentFixture<RegistroEntradaSaidaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroEntradaSaidaFormComponent]
    });
    fixture = TestBed.createComponent(RegistroEntradaSaidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
