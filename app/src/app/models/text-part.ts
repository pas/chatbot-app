export class TextPart {
  text : string;
  type : string;

  constructor( text : string ) {
    this.text = text;
    this.type = "text-part";
  }

  toString() {
    return this.text;
  }

  setType() {
    return this.type;
  }

  isType( value : string ) {
    return value == this.type;
  }

  getType() : string {
    return this.type;
  }
}
