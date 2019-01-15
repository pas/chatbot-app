import { TestBed } from '@angular/core/testing';

import { Text } from './text';
import { TextPart } from './text-part';
import { Knowledge } from './knowledge';
import { SimpleCollection } from './simple-collection';

describe('Knowledge', () => {
  let textPart : TextPart;
  let knowledge : Knowledge;
  let text : Text;

  beforeEach(() => {
    textPart = new TextPart( "The fat" );
    knowledge = new Knowledge("cat");
    text = new Text( new SimpleCollection<TextPart>([ textPart , knowledge ]) );
  });

  it('should create', () => {
    expect(text).toBeTruthy();
  });

  it('should be the string "The fat cat"', () => {
    expect(text.toString()).toBe("The fat cat");
  })
});
