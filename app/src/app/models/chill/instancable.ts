/**
*  Instancable objects are objects that
*   can be recreated from the database
**/
export interface Instancable {
  /* This part is stored in the database and used
     to find the correct class an recreate the
     object. See chill.js */

  // Name of the instance/class
  instance : string;
}
