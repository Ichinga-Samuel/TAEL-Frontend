import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbooksComponent } from './textbooks.component';

describe('TextbooksComponent', () => {
  let component: TextbooksComponent;
  let fixture: ComponentFixture<TextbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
