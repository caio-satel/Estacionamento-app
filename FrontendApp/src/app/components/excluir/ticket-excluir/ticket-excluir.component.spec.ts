import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketExcluirComponent } from './ticket-excluir.component';

describe('TicketExcluirComponent', () => {
  let component: TicketExcluirComponent;
  let fixture: ComponentFixture<TicketExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketExcluirComponent]
    });
    fixture = TestBed.createComponent(TicketExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
