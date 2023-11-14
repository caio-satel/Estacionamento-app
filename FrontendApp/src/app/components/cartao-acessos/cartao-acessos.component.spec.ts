import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoAcessosComponent } from './cartao-acessos.component';

describe('CartaoAcessosComponent', () => {
  let component: CartaoAcessosComponent;
  let fixture: ComponentFixture<CartaoAcessosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartaoAcessosComponent]
    });
    fixture = TestBed.createComponent(CartaoAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
