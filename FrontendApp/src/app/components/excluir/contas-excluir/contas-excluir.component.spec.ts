import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasExcluirComponent } from './contas-excluir.component';

describe('ContasExcluirComponent', () => {
  let component: ContasExcluirComponent;
  let fixture: ComponentFixture<ContasExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContasExcluirComponent]
    });
    fixture = TestBed.createComponent(ContasExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
