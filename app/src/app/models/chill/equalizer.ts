import { Instancable } from "./instancable";
import { Identifiable } from './indentifiable';

/**
* Provides simple isEqualTo method
* for Identifiable objects
*/
export class Equalizer implements Instancable {
  private toEqualId : string;
  instance;

  constructor( toEqualId : string ) {
    this.toEqualId = toEqualId;
    this.instance = "equalizer";
  }

  isEqualTo( element : Identifiable ) {
    return this.toEqualId === element.getId();
  }

  hasId( id : string ) : boolean {
    return id === this.toEqualId;
  }
}
