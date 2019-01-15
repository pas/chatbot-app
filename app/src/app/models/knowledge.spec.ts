import { TestBed } from '@angular/core/testing';
import { Knowledge } from './knowledge';

describe('Knowledge', () => {
  let knowledge: Knowledge;

  beforeEach(() => {
    knowledge = new Knowledge( "cat" );
  });

  it('should create', () => {
    expect(knowledge).toBeTruthy();
  });

  describe('when changing to dog', () => {
    beforeEach(() => {
      knowledge.change("dog");
    })

    it('should be a "dog"', () => {
      expect(knowledge.getValue()).toBe( "dog" );
    })

    it('should store "cat" as change', () => {
      expect(knowledge.getPrevious()).toBe( "cat" );
    })

    it('should be replaced', () => {
      expect(knowledge.hasChanged()).toBe( true );
    })
  })
});
