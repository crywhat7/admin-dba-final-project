import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorTablasComponent } from './selector-tablas.component';

describe('SelectorTablasComponent', () => {
  let component: SelectorTablasComponent;
  let fixture: ComponentFixture<SelectorTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorTablasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
