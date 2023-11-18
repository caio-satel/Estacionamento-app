import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasExcluirComponent } from './reservas-excluir.component';

describe('ReservasExcluirComponent', () => {
  let component: ReservasExcluirComponent;
  let fixture: ComponentFixture<ReservasExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasExcluirComponent]
    });
    fixture = TestBed.createComponent(ReservasExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
