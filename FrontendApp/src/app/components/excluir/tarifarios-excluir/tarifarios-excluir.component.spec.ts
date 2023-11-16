import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifariosExcluirComponent } from './tarifarios-excluir.component';

describe('TarifariosExcluirComponent', () => {
  let component: TarifariosExcluirComponent;
  let fixture: ComponentFixture<TarifariosExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifariosExcluirComponent]
    });
    fixture = TestBed.createComponent(TarifariosExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
