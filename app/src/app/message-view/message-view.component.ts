import { Component, Input, Injectable, ViewChild, Output, EventEmitter } from '@angular/core';

// Models
import { MessageGroup } from '../models/message-group';
import { Message } from '../models/message';
import { Knowledge } from '../models/knowledge';
import { MessageButton } from '../models/message-button';

// Scrolling
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { KnowledgeService } from '../knowledge.service';
import { BotConnectionService, BotResult } from '../bot-connection.service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css'],
})

@Injectable()
export class MessageViewComponent {
  @Input() messageGroup : MessageGroup;
  @Output() newMessage : EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(CdkVirtualScrollViewport) viewport : CdkVirtualScrollViewport;

  constructor(public knowledgeService : KnowledgeService, public botService : BotConnectionService) {
  }

  public scrollToBottom() {
    // It works but it is problematic:
    // 1) VirtualScroll does only support fixed sized items but my items change
    // size with their content length
    // 2) I can't use *cdkVirtualFor because it does not rerender the component
    // when a new items is added. Don't know why
    this.viewport.scrollToIndex( this.messageGroup.size()-1 );    //console.log(this.scrollView.scrollToBottom());
  }

  createNewMessage( part ) : void {
    this.newMessage.emit( part );
  }
}
