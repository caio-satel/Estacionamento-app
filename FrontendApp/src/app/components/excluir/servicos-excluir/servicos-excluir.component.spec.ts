import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosExcluirComponent } from './servicos-excluir.component';

describe('ServicosExcluirComponent', () => {
  let component: ServicosExcluirComponent;
  let fixture: ComponentFixture<ServicosExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicosExcluirComponent]
    });
    fixture = TestBed.createComponent(ServicosExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
