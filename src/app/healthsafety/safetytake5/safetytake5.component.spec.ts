/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Safetytake5Component } from './safetytake5.component';

describe('Safetytake5Component', () => {
  let component: Safetytake5Component;
  let fixture: ComponentFixture<Safetytake5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Safetytake5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Safetytake5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
