import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcuparVagaComponent } from './ocupar-vaga.component';

describe('OcuparVagaComponent', () => {
  let component: OcuparVagaComponent;
  let fixture: ComponentFixture<OcuparVagaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcuparVagaComponent]
    });
    fixture = TestBed.createComponent(OcuparVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
