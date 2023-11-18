import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosEditarComponent } from './servicos-editar.component';

describe('ServicosEditarComponent', () => {
  let component: ServicosEditarComponent;
  let fixture: ComponentFixture<ServicosEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicosEditarComponent]
    });
    fixture = TestBed.createComponent(ServicosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
