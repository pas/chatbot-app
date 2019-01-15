import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TextPart } from '../models/text-part';
import { MessageText } from '../models/message-text';

@Component({
  selector: 'app-message-text',
  templateUrl: './message-text.component.html',
  styleUrls: ['./message-text.component.css']
})
export class MessageTextComponent implements OnInit {
  @Input() part : MessageText;
  @Output() onSelect : EventEmitter<TextPart> = new EventEmitter<TextPart>();

  constructor() { }

  ngOnInit() {
  }

  onSelectElement( part : TextPart ) : void {
    this.onSelect.emit( part );
  }

}
