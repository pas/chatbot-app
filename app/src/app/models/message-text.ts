import { MessageContent } from './message-content';
import { SimpleCollection } from './simple-collection';
import { TextPart } from './text-part';

export class MessageText extends MessageContent {
  type: string;
  text: SimpleCollection<TextPart>;

  constructor( text : SimpleCollection<TextPart> ) {
    super();

    this.text = text;
    this.type = 'message-text';
 }

  getType(): string {
      return this.type;
  }

  toString(): string {
    return this.text.getAll().reduce((prev, curr) => {
      let space = "";
      if(prev) { space = " " };
      return prev + space + curr.toString();
    }, "");
  }

  getValue() {
    return this.text;
  }

  getAll() {
    return this.text;
  }
}
