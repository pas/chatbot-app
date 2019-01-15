import { SimpleCollection } from './simple-collection';
import { Knowledge } from './knowledge';
import * as assert from 'assert';

export class KnowledgeCollection extends SimpleCollection<Knowledge> {
  subscriber : Function[] = [];

  private _noDuplicates( element : Knowledge ) {
    return !this.collection.reduce<boolean>( (previous : boolean, current : Knowledge) => {
      return previous || current.getDescription() == element.getDescription();
    }, false)
  }

  // Currently subscribers are only called when an adding
  // happens
  add( toAdd : Knowledge ) : void {
    assert( this._noDuplicates(toAdd) );

    super.add( toAdd );
    this._callSubscribers('add', toAdd);
  };

  private _callSubscribers( call : string , value : Knowledge ) {
    this.subscriber.forEach( (func) => {
      func( call , value );
    })
  }

  // Returns a unsubscribe function
  subscribe( func : Function ) : Function {
    this.subscriber.push( func );

    return () => {
      let index = this.subscriber.indexOf( func );
      if (index > -1) {
        this.subscriber.splice(index, 1);
      }
    }
  }

  clear(): any {
    this.collection = [];
    this._callSubscribers('clear', null);
  }
}
