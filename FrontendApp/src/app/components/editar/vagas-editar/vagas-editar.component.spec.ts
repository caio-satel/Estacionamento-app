import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasEditarComponent } from './vagas-editar.component';

describe('VagasEditarComponent', () => {
  let component: VagasEditarComponent;
  let fixture: ComponentFixture<VagasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VagasEditarComponent]
    });
    fixture = TestBed.createComponent(VagasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
