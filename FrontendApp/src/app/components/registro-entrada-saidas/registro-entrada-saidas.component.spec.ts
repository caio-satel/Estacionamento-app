import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntradaSaidasComponent } from './registro-entrada-saidas.component';

describe('RegistroEntradaSaidasComponent', () => {
  let component: RegistroEntradaSaidasComponent;
  let fixture: ComponentFixture<RegistroEntradaSaidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroEntradaSaidasComponent]
    });
    fixture = TestBed.createComponent(RegistroEntradaSaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
