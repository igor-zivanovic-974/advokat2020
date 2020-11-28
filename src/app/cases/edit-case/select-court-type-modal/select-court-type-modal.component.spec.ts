import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourtTypeModalComponent } from './select-court-type-modal.component';

describe('SelectCourtTypeModalComponent', () => {
  let component: SelectCourtTypeModalComponent;
  let fixture: ComponentFixture<SelectCourtTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCourtTypeModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCourtTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
