import { Identifiable } from './indentifiable';

/*
* A typed object has a type and is identifiable.
* Types are used to determine which class
* corresponds to an object.
*/
export interface Typed extends Identifiable {
  type : string;
  getType() : string;
  isType( type : string ) : boolean;  
}
