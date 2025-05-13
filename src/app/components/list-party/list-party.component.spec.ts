import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartyComponent } from './list-party.component';

describe('ListPartyComponent', () => {
  let component: ListPartyComponent;
  let fixture: ComponentFixture<ListPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPartyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
