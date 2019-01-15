import { Identifiable } from './indentifiable';

/*
* Interface used to create object that
* can be stored in and read from a database.
* For a use case look at chill.js
*/
export interface Chillable extends Identifiable {
  _id : string;
  replaced : boolean;
  deleted : boolean;
  /* Set to true when object is saved for the first time
     in the database. Before it should always return false */
  persistent() : boolean;
  /* Set when the object is saved for the first time */
  save() : void;
}
