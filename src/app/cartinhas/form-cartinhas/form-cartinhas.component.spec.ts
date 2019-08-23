import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCartinhasComponent } from './form-cartinhas.component';

describe('FormCartinhasComponent', () => {
  let component: FormCartinhasComponent;
  let fixture: ComponentFixture<FormCartinhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCartinhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCartinhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
