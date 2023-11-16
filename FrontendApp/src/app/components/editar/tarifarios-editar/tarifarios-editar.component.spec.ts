import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifariosEditarComponent } from './tarifarios-editar.component';

describe('TarifariosEditarComponent', () => {
  let component: TarifariosEditarComponent;
  let fixture: ComponentFixture<TarifariosEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifariosEditarComponent]
    });
    fixture = TestBed.createComponent(TarifariosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
