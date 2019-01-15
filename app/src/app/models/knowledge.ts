import { TextPart } from './text-part';

export class Knowledge extends TextPart {
  /* Stores the first set value */
  text : string;
  /* Stores the last overwritten value */
  replaced : string;
  description: string;

  constructor( text : string , description? : string ) {
    super( text );
    this.text = text;
    this.type = "knowledge";
    this.description = description;
    this.replaced = null;
  }

  getValue() {
    return this.text;
  }

  getDescription() {
    return this.description
  }

  setDescription( description : string ) {
    this.description = description;
  }

  toString() {
    return this.text;
  }

  change( text : string ) {
    this.replaced = this.text;
    this.text = text;
  }

  getPrevious() {
    return this.replaced;
  }

  hasChanged() : boolean {
    return this.replaced != null;
  }
}
