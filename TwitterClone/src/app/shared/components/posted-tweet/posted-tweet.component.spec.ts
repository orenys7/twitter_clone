import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedTweetComponent } from './posted-tweet.component';

describe('PostedTweetComponent', () => {
  let component: PostedTweetComponent;
  let fixture: ComponentFixture<PostedTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedTweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
