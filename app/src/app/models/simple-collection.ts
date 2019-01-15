import { SimpleCollectionizable } from './simple-collectionizable';
import * as assert from 'assert';

export class SimpleCollection<T> implements SimpleCollectionizable<T> {
  collection : Array<T>;
  instance;

  constructor( collection : Array<T> ) {
    this.collection = collection ? collection : [];
    this.instance = "simple_collection";
  }

  protected stable() {
    assert( !!this.collection, " Collection should never be a false value (false, null, undefined, 0) but was " + this.collection );
    assert( typeof this.collection === 'object', "Collection should always be an object but was " + this.collection );
  }

  getAll() : Array<T> {
    this.stable();
    return this.collection;
  };

   /* Filters the collection by the
   * property name. Returns a new
   * collection holding all elements
   * where the property does not
   * hold a falsy value
   */
  filterBy(propertyName) : SimpleCollection<T> {
    var newArray = this.collection.filter(function(element) {
      return !!element[propertyName];
    })

    this.stable();
    return new SimpleCollection<T>(newArray);
  };

  size() : number {
    this.stable();
    return this.collection.length
  };

  isEmpty() : boolean {
    this.stable();
    return this.collection.length === 0;
  };

  replaceAt( toReplace : T , index : number ) {
    this.collection[index] = toReplace;
  }

  removeAt( index : number ) {
    this.collection.splice(index, 1);
  }b

  add( toAdd : T ) : void {
    this.collection.push( toAdd );
    this.stable();
  };

  addAll( toAdd : T[] ) : void {
    this.collection.push.apply( this.collection , toAdd );
    this.stable();
  }

  getAllWith( key : string , value : any ) : SimpleCollection<T> {
    return new SimpleCollection<T>(this.collection.filter(function(element) {
      return element[key] === value;
    }));
  };

  copy() : SimpleCollection<T> {
    var newCollection : Array<T> = [];
    for( var i = 0 ; i < this.collection.length ; i++ ) {
      newCollection[i] = this.collection[i]
    }
    return new SimpleCollection<T>( newCollection );
  }

  empty() : boolean {
    return this.collection.length === 0;
  };

  getByIndex( index : number ) : T {
    return this.collection[index];
  };

  first() : T {
    return this.collection[0];
  };

    /* Sorts the internal array by the
   * given property
   */
  sortBy( propertyName : string ) {
    this.collection.sort(function(a, b) {
      if(a[propertyName] > b[propertyName]) {
        return 1;
      }
      else if(a[propertyName] > b[propertyName]) {
        return -1
      }
      else
        return 0;
    });

    return this;
  };

  /* Sorts the internal array by the
   * given function
   */
  sort( func ) {
    this.collection.sort( func );
    return this;
  };

  /* Finds the next element to the given
   * element.
   * Loops from end to begin if
   * the current element is the
   * last one.
   */
  next( item : T ) : T {
    var index = this.collection.indexOf( item );
    index += 1;
    return index <= this.collection.length-1 ? this.collection[index] : this.collection[0];
  }

  /* Iterates over all values */
  forEach( callback , thisParameter? : any ) {
    this.collection.forEach( callback , thisParameter );
  }

  getInSlicesOf( numberOfItemsInSlice : number ) : SimpleCollection<T> {
    var slices = new SimpleCollection<T>([]);

    var temp = null;
    this.collection.forEach( function( element , index ) {
      if( index % numberOfItemsInSlice == 0 ) {
        temp = new SimpleCollection<T>( [] );
        slices.add( temp );
      }
      temp.add( element );
    }, this);

    return slices;
  };
}
