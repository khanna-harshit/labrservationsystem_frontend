import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedeviceComponent } from './updatedevice.component';

describe('UpdatedeviceComponent', () => {
  let component: UpdatedeviceComponent;
  let fixture: ComponentFixture<UpdatedeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
