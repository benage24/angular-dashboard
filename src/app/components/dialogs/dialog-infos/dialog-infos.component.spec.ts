import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfosComponent } from './dialog-infos.component';

describe('DialogInfosComponent', () => {
  let component: DialogInfosComponent;
  let fixture: ComponentFixture<DialogInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
