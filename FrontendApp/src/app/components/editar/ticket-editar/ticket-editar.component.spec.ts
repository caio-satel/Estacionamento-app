import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditarComponent } from './ticket-editar.component';

describe('TicketEditarComponent', () => {
  let component: TicketEditarComponent;
  let fixture: ComponentFixture<TicketEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketEditarComponent]
    });
    fixture = TestBed.createComponent(TicketEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
