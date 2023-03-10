import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectdesComponent } from './projectdes.component';

describe('ProjectdesComponent', () => {
  let component: ProjectdesComponent;
  let fixture: ComponentFixture<ProjectdesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectdesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
