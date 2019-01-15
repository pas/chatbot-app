/*
* Identifiable objects hold unique
* ids to identify them.
*
* In most cases it makes sense to
* use id strings created by uuid.v4()
*/

export interface Identifiable {
  /* Compares two Identifiable objects. Return true if they
     have the same id */
  isEqualTo( element : Identifiable ) : boolean;
  /* Returns true if the object is identified by the given
     id string */
  hasId( id : string ) : boolean;
  /* Returns the id string of this object */
  getId() : string;
  /* Sets the passed id as new id string */
  setId( id : string ) : void;
}
