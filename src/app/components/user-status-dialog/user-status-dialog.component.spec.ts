import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusDialogComponent } from './user-status-dialog.component';

describe('UserStatusDialogComponent', () => {
  let component: UserStatusDialogComponent;
  let fixture: ComponentFixture<UserStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserStatusDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
