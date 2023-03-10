import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChnagepasswordComponent } from './chnagepassword.component';

describe('ChnagepasswordComponent', () => {
  let component: ChnagepasswordComponent;
  let fixture: ComponentFixture<ChnagepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChnagepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChnagepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
