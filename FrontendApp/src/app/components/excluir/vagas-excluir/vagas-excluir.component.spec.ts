import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasExcluirComponent } from './vagas-excluir.component';

describe('VagasExcluirComponent', () => {
  let component: VagasExcluirComponent;
  let fixture: ComponentFixture<VagasExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VagasExcluirComponent]
    });
    fixture = TestBed.createComponent(VagasExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
