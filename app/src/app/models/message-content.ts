import { Chillable } from './chill/chillable';
import { Typed } from './chill/typed';
import { Equalizer } from './chill/equalizer';
import { Identifiable } from './chill/indentifiable';

import * as assert from 'assert';
import { v4 as uuid } from 'uuid';


/**
* A model for one message content
* in a chat.
*/
export abstract class MessageContent implements Typed, Chillable {
  /* Typed */
  abstract type: string;

  /* Chillable */
  deleted: boolean;
  replaced: boolean;
  _id: string;
  private toEqualId : string;
  private equalizer: Equalizer;

  constructor() {
    /* Default values for Chillable */
    this.replaced = false;
    this.deleted = false;
    this._id = uuid();

    /* Equalizer make comparing object easier*/
    this.equalizer = new Equalizer( this._id );
  }

  abstract getValue();

  /* Chillable */
  isEqualTo( toCompare : Identifiable ) : boolean {
    assert(!!toCompare, "'name' must not be a false value (null, undefined, false, 0)");

    return this.equalizer.isEqualTo( toCompare );
  }

  hasId( idToCompare : string ) {
    return this.equalizer.hasId( idToCompare );
  }

  getId() {
    return this._id;
  }

  setId( id : string ) {
    this._id = id;
  }

  /* Chillable */
  save(): void {
    //noop
  }

  /* Chillable */
  persistent(): boolean {
    return false;
  }

  /* Typed */
  getType() : string {
    return this.type;
  }

  /* Typed */
  isType(type: string): boolean {
    return this.type == type;
  }
}
