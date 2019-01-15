import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MessageButton } from '../models/message-button';

@Component({
  selector: 'app-message-button',
  templateUrl: './message-button.component.html',
  styleUrls: ['./message-button.component.css']
})
export class MessageButtonComponent implements OnInit {
  @Input() part : MessageButton;
  @Output() onSelect : EventEmitter<MessageButton>  = new EventEmitter<MessageButton>();

  constructor() { }

  ngOnInit() {
  }

  onSelectElement( part : MessageButton ) : void {
    this.onSelect.emit( part );
  }
}
