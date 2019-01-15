import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  @Output() newInput : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onEnter( input ) {
    this.newInput.emit( input.value );
    input.value = "";
  }

}
