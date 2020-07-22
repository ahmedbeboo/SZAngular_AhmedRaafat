import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDiaryAddComponent } from './personal-diary-add.component';

describe('PersonalDiaryAddComponent', () => {
  let component: PersonalDiaryAddComponent;
  let fixture: ComponentFixture<PersonalDiaryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDiaryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDiaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
