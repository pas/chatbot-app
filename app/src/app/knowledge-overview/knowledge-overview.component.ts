import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Knowledge } from '../models/knowledge';
import { MatTable } from '@angular/material';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { KnowledgeCollection } from '../models/knowledge-collection';

@Component({
  selector: 'app-knowledge-overview',
  templateUrl: './knowledge-overview.component.html',
  styleUrls: ['./knowledge-overview.component.css']
})
export class KnowledgeOverviewComponent implements OnInit {
  @Input() knowledgeData : KnowledgeCollection;
  knowledges: Knowledge[];
  @ViewChild( MatTable ) table : MatTable<Message>;
  @Output() editEvent : EventEmitter<Knowledge> = new EventEmitter<Knowledge>();

  displayedColumns: string[] = ['description', 'value'];

  constructor() { }

  ngOnInit(): void {
    this.knowledges = this.knowledgeData.getAll();
    this.knowledgeData.subscribe( () => {
      this.knowledges = this.knowledgeData.getAll();
      this.table.renderRows();
    });
  }

  edit( knowledge : Knowledge ) {
    this.editEvent.emit( knowledge );
  }
}
