import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsDetailsComponent } from './my-events-details.component';

describe('MyEventsDetailsComponent', () => {
  let component: MyEventsDetailsComponent;
  let fixture: ComponentFixture<MyEventsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEventsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
