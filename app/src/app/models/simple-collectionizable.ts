/**
* Interface for simple collections
**/
export interface SimpleCollectionizable<T> {
  getAll() : Array<T>;
  filterBy( propertyName : string) : SimpleCollectionizable<T>;
  size() : number;
  isEmpty() : boolean;
  replaceAt( toReplace : T , index : number ) : void;
  removeAt( index : number ) : void;
  add( toAdd : T ) : void;
  getAllWith( key : string , value : any );
  copy() : SimpleCollectionizable<T>;
  empty() : boolean;
  getByIndex( index : number ) : T;
  first() : T;
  sortBy( propertyName : string ) : void;
  sort( func : any ) : void;
  next( item : T ) : T;
  forEach( callback : any , thisParameter? : any );
  getInSlicesOf( numberOfItemsInSlice : number ) : SimpleCollectionizable<T>;
}
