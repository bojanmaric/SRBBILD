import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagaziniComponent } from './magazini.component';

describe('MagaziniComponent', () => {
  let component: MagaziniComponent;
  let fixture: ComponentFixture<MagaziniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagaziniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagaziniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
