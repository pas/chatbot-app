import { MessageContent } from './message-content';
import { SimpleCollection } from './simple-collection';
import { MessageText } from './message-text';
import { TextPart } from './text-part';

export class Message extends SimpleCollection<MessageContent> {
  name;

  constructor( messages : MessageContent[]) {
    super( messages );
    this.name = "none";
  }

  static buildWithString( text : string ) {
    return new Message( [ new MessageText( new SimpleCollection<TextPart> ([ new TextPart( text ) ]) ) ])
  }

  static buildWithTextParts( elements : TextPart[] ) {
    let collection = new SimpleCollection<TextPart>( elements );
    return new Message( [ new MessageText( collection ) ] );
  }

  getName() : string {
    return this.name;
  }

  setName( name : string ) {
    this.name = name;
  }

  isFromBot() : boolean {
    return this.name.toLowerCase() == 'bot';
  }
}
