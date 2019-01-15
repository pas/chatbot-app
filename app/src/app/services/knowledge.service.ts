import { Injectable, EventEmitter } from '@angular/core';
import { Knowledge } from './models/knowledge';
import { MessageButton } from './models/message-button';
import { Message } from './models/message';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { InputDialogComponent } from './input-dialog/input-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  edit( knowledge: Knowledge ) : Observable<Message> {
    let emitter = new EventEmitter<Message>();

    this
      .openDialog( knowledge.toString() )
      .afterClosed().subscribe(result => {
        if( result ) {
          let mess = Message.buildWithString( "If you want to change '" + knowledge.getValue() + "' to '" + result + "' then you can write the following:");
          let button = new MessageButton( "I'd like to change my " + knowledge.getDescription() + " to " + result );
          button.setData( knowledge );
          mess.add( button );
          mess.setName('Bot');
          emitter.emit(  mess );
        }
      });

    return emitter.asObservable();
  }

  constructor(public dialog: MatDialog) { }

  openDialog( value : string ): MatDialogRef<InputDialogComponent> {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '250px',
      data: {
        noButton : "No" ,
        yesButton : "Yes" ,
        textMessage : "Oh, did I understand something wrong? Please correct me.",
        value : value
      }
    });

    return dialogRef;
  }
}
