// Angular
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Angular CDK
import {ScrollDispatchModule, ScrollDispatcher} from '@angular/cdk/scrolling';

// Angular Material
import { MatDialogModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatTableModule, MatExpansionModule,
  MatIconModule, MatIconRegistry } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessageComponent } from './message/message.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { MessageTextComponent } from './message-text/message-text.component';
import { MessageButtonComponent } from './message-button/message-button.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { KnowledgeOverviewComponent } from './knowledge-overview/knowledge-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    MessageComponent,
    InputDialogComponent,
    MessageViewComponent,
    MessageTextComponent,
    MessageButtonComponent,
    MessageInputComponent,
    KnowledgeOverviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    ScrollDispatchModule
  ],
  entryComponents: [
    InputDialogComponent
  ],
  providers: [ MatIconRegistry , ScrollDispatcher ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor( public matIconRegistry: MatIconRegistry ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
