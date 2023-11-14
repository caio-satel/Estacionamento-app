import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoExtrasComponent } from './servico-extras.component';

describe('ServicoExtrasComponent', () => {
  let component: ServicoExtrasComponent;
  let fixture: ComponentFixture<ServicoExtrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoExtrasComponent]
    });
    fixture = TestBed.createComponent(ServicoExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
