import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDueniosComponent } from './tabla-duenios.component';

describe('TablaDueniosComponent', () => {
  let component: TablaDueniosComponent;
  let fixture: ComponentFixture<TablaDueniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDueniosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDueniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
