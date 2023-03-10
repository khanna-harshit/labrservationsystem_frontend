import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologydetailsComponent } from './topologydetails.component';

describe('TopologydetailsComponent', () => {
  let component: TopologydetailsComponent;
  let fixture: ComponentFixture<TopologydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopologydetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopologydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
