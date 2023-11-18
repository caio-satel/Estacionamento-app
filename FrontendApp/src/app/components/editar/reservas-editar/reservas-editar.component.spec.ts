import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasEditarComponent } from './reservas-editar.component';

describe('ReservasEditarComponent', () => {
  let component: ReservasEditarComponent;
  let fixture: ComponentFixture<ReservasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasEditarComponent]
    });
    fixture = TestBed.createComponent(ReservasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
