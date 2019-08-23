import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartinhasComponent } from './cartinhas.component';

describe('CartinhasComponent', () => {
  let component: CartinhasComponent;
  let fixture: ComponentFixture<CartinhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartinhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartinhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
