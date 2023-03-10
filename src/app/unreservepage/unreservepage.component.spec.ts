import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreservepageComponent } from './unreservepage.component';

describe('UnreservepageComponent', () => {
  let component: UnreservepageComponent;
  let fixture: ComponentFixture<UnreservepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnreservepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnreservepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
