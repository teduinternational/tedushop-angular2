import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTinyComponent } from './simple-tiny.component';

describe('SimpleTinyComponent', () => {
  let component: SimpleTinyComponent;
  let fixture: ComponentFixture<SimpleTinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
