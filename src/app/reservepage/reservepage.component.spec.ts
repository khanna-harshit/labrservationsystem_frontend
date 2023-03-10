import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservepageComponent } from './reservepage.component';

describe('ReservepageComponent', () => {
  let component: ReservepageComponent;
  let fixture: ComponentFixture<ReservepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
