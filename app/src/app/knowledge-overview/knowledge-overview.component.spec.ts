import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeOverviewComponent } from './knowledge-overview.component';

describe('KnowledgeOverviewComponent', () => {
  let component: KnowledgeOverviewComponent;
  let fixture: ComponentFixture<KnowledgeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
