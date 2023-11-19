import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasEditarComponent } from './contas-editar.component';

describe('ContasEditarComponent', () => {
  let component: ContasEditarComponent;
  let fixture: ComponentFixture<ContasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContasEditarComponent]
    });
    fixture = TestBed.createComponent(ContasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
