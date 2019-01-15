import { MessageContent } from './message-content';

export class MessageButton extends MessageContent {
  type: string;
  /* Stores the first set value */
  text : string;
  data : Object;

  constructor( text : string ) {
    super();
    this.text = text;
    this.type = "message-button";
  }

  getValue() {
    return this.text;
  }

  toString() {
    return this.text;
  }

  setData( data : Object ) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getType(): string {
    return this.type;
  }
}
