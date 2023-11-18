import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosFormComponent } from './servicos-form.component';

describe('ServicosFormComponent', () => {
  let component: ServicosFormComponent;
  let fixture: ComponentFixture<ServicosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicosFormComponent]
    });
    fixture = TestBed.createComponent(ServicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
