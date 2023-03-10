import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreservedComponent } from './unreserved.component';

describe('UnreservedComponent', () => {
  let component: UnreservedComponent;
  let fixture: ComponentFixture<UnreservedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnreservedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnreservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
