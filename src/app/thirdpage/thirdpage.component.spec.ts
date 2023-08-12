import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdpageComponent } from './thirdpage.component';

describe('ThirdpageComponent', () => {
  let component: ThirdpageComponent;
  let fixture: ComponentFixture<ThirdpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
