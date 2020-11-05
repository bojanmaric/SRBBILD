import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcatalogComponent } from './addcatalog.component';

describe('AddcatalogComponent', () => {
  let component: AddcatalogComponent;
  let fixture: ComponentFixture<AddcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
