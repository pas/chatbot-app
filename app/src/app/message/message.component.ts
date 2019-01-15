// Angular
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// Models
import { Message } from '../models/message';
import { MessageContent } from '../models/message-content';
import { TextPart } from '../models/text-part';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})

export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Output() newMessage = new EventEmitter<TextPart>();

  constructor() {}

  ngOnInit() {
  }

  // Called when a specific part of the message was
  // select e.g. Knowledge. Returns this part.
  onSelectPart( part : TextPart ) : void {
    this.newMessage.emit( part );
  }

  // Called when any part of the message was selected
  // You could use another interface for a selection
  // { message : Message , messageContent : messageContent , selected : anyPartOfTheMessage }
  // TODO: Remove when unused at the end!
  onSelectFull( part : MessageContent ) : void {
    console.log(part.toString());
  }
}
