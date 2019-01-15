import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

// keyword extraction
//import * as keywordExtraction from 'node-rake';

// models
import { MessageGroup } from '../models/message-group';
import { MessageButton } from '../models/message-button';
import { MessageText } from '../models/message-text';
import { Message } from '../models/message';
import { TextPart } from '../models/text-part';
import { SimpleCollection } from '../models/simple-collection';
import { Knowledge } from '../models/knowledge';
import { BotConnectionService, BotResult, TrackerResult } from '../services/bot-connection.service';
import { MessageViewComponent } from '../message-view/message-view.component';
import { KnowledgeCollection } from '../models/knowledge-collection';
import { KnowledgeService } from '../services/knowledge.service';
import { MessageContent } from '../models/message-content';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  @ViewChild(MessageViewComponent) messageView : MessageViewComponent;

  scrollToBottom() {
    // This call to detectChange is needed so the view is updated before
    // we scroll to the bottom
    this.change.detectChanges();
    this.messageView.scrollToBottom();
    console.log(this.messageGroup);
  }

  messageGroup : MessageGroup = null;
  knowledgeData : KnowledgeCollection = new KnowledgeCollection( [] );
  box;
  //ugly!!!
  knowledge : Knowledge;

  constructor(public knowledgeService : KnowledgeService , public botService : BotConnectionService , public change : ChangeDetectorRef) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    let message1 = Message.buildWithString( "Hi! My name is Rico. I'm your new nutrition coach." );
    message1.setName("Melanie");
    let message2 = Message.buildWithString( "You can tell me what you were eating today:" );
    message2.add( new MessageButton("I ate pizza!") );
    message2.add( new MessageButton("Please change food to pizzas") );
    message2.add( new MessageButton("/restart") );
    message2.add( new MessageButton("No, I meant pizzas") );
    message2.add( new MessageButton("Bye") );
    message2.setName("Bot");

    // Create message group
    this.messageGroup = new MessageGroup( [ message1 , message2 ] );
  }

  // Completly restarts the bot
  restart() {
    this.clear();
    this.knowledgeData.clear();
    this.botService.getReply( "/restart" ).subscribe( (data) => {
      console.log("restart data", data);
      this.init();
    });
  }

  // Removes all messages in the chat
  clear() {
    this.messageGroup = new MessageGroup( [] );
  }

  separate( keywords : string[] , message : string , knowledge? : Knowledge ) {
    let collection = new SimpleCollection<TextPart>( [] );
    keywords.forEach( (keyword) => {
      // Don't do anything if the keyword is not in the sentence
      if( message.indexOf( keyword ) > -1 ) {
        let text = message.split(keyword, 1)[0];
        if (text != "") {
          collection.add( new TextPart(text) );
        }

        if(knowledge) {
          collection.add( knowledge );
        }
        else {
          this.knowledge = new Knowledge(keyword);
          collection.add( this.knowledge );
        }

        message = this.removeUsed( message , keyword )
        console.log(keyword)
      }
    })

    // Addding the rest of the message if the last one is
    // not knowledge!
    if(message) {
      collection.add( new TextPart(message) );
    }

    console.log(collection);
    return collection;
  }

  edit( knowledge : Knowledge ) {
    this.knowledgeService
      .edit( knowledge )
      .subscribe( (mess) => {
        this.messageGroup.add( mess );
        this.scrollToBottom();
      });
  }

  private updateKnowledge( slots ) {
    for (var key in slots) {
      // Ignore private slots
      if(!key.startsWith("_") ) {
        // Get knowledge with the given description
        let previous : Knowledge = this.knowledgeData.getAllWith("description", key).first()
        // Create a new knowledge with the given data
        let current : Knowledge = new Knowledge(slots[key], key);

        if(previous && previous.getValue() != current.getValue() ) {
          console.log("Update knowledge for '" + key + "'")
          previous.change( current.getValue() );

        }
        else if(!previous && current.getValue()) {
          console.log("Add new knowledge for '" + key + "'")
          this.knowledgeData.add(current);
        }
        else {
          console.log("Not adding or updating knowledge for '" + key + "'");
        }

        console.log(this.knowledgeData);
      }
    }
  }

  /*
  * Not too bright and I hate this solution
  * I should use last_message and look at the entities
  * and adjust according to "start"
  *
  * Simply goes through the whole text and splits it everytime
  * it can find the keyword.
  */
  private adjustMessage( message : Message , knowledge : Knowledge , messageText : string) {
    let content : MessageContent = message.first();

    if( content.type == 'message-text') {
      let collection : SimpleCollection<TextPart> = new SimpleCollection<TextPart>([]);
      let mText : MessageText = content as MessageText;

      mText.getAll().forEach( (part : TextPart) => {
        console.log("part", part);
        //Dynamic type!
        if( part.isType("text-part") ) {
          let parts : SimpleCollection<TextPart> = this.separate( [ knowledge.getValue() ] , part.text , knowledge )
          console.log("parts", parts);
          collection.addAll( parts.getAll() );
          console.log("collection after addAll", collection);
        }
        // Ignore knowledge parts
        else {
          collection.add( part );
        }
      })

      console.log("collection", collection);
      message.removeAt(0);
      message.add( new MessageText(collection) );
    }
  }

  private adjustMessages( message : Message , messageText : string, botMessage : Message , botMessageText : string , knowledge : Knowledge ) {
    this.adjustMessage( message , knowledge, messageText);
    this.adjustMessage( botMessage, knowledge, botMessageText);
  }

  private updateMessages( slots , messageText : string , message : Message , botMessage : Message , botMessageText : string) {
    console.log("#updateMessages");
    for (var key in slots) {
      //Ignore private keys
      if( !key.startsWith("_") ) {
        // This should always exist because we added it in #updateKnowledge
        let knowledge : Knowledge = this.knowledgeData.getAllWith("description", key).first()
        console.log("knowledge in updateMessages", knowledge);
        // If there is no previous and the slot is actually set
        if(knowledge && knowledge.getValue()) {
          this.adjustMessages( message , messageText , botMessage , botMessageText , knowledge );
          console.log("Adjusted messages for '" + key + "'");
        }
        else {
          console.log("Not adding or changing knowledge for '" + key + "'" );
        }
      }
    }
  }

  newMessage( part ) {
    if( part.isType( 'knowledge' ) ) {
      let knowledge = part as Knowledge;
      this.knowledgeService
        .edit( knowledge )
        .subscribe( (mess) => {
          this.messageGroup.add( mess );
          this.scrollToBottom();
        });
    }
    else if ( part.isType( 'message-button' ) ) {
      let mess = Message.buildWithString( part.toString() );
      mess.setName('Melanie');
      this.messageGroup.add( mess );
      this.scrollToBottom();

      let button = part as MessageButton;
      // TODO: Fix this!
      //let data = button.getData();
      console.log(button.getValue());
      this.botService.getReply( button.getValue() ).subscribe( (data : [BotResult]) => {
        if( data.length > 0) {
          let botMessage = Message.buildWithString( data[0].text );
          botMessage.setName('Bot');
          this.messageGroup.add( botMessage );

          this.botService.getTracker().subscribe( (tData : TrackerResult) => {
            this.updateKnowledge( tData.slots );
            this.updateMessages( tData.slots , button.getValue() , mess , botMessage , data[0].text );
          })
        }
      });
    }
  }

  newInput( value ) {
    if(value == "" || value == null) {
      return;
    }


    console.log(value);
    if( value == "/restart") {
      this.restart();
      return;
    }
    if( value == "/clear" ) {
      this.clear();
      return;
    }
    /*let keywords = keywordExtraction.generate(value);*/

    // Add collection to the current message group
    let message = Message.buildWithString( value );
    message.setName("Melanie")
    this.messageGroup.add( message );
    this.scrollToBottom();

    this.botService.getReply( value ).subscribe( (data : [BotResult]) => {
      console.log( data );
      if( data.length > 0) {
        let botMessage = Message.buildWithString( data[0].text );
        botMessage.setName('Bot');
        this.messageGroup.add( botMessage );

        this.botService.getTracker().subscribe( (tData : TrackerResult) => {
          // TODO: Use last_message instead of slots. Then you know where
          // an entity starts
          console.log(tData.slots);

          // #updateKnowledge has to be first!
          this.updateKnowledge( tData.slots );
          this.updateMessages( tData.slots , value , message , botMessage , data[0].text );
        })
      }
    })
  }

  //Remove used parts and return rest of the sentence
  removeUsed( text , keyword ) : string {
    return text.substring( text.indexOf( keyword ) + keyword.length);
  }
}
