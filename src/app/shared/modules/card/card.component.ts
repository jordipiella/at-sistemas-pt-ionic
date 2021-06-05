import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ICard } from './interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @ContentChild('content', { read: TemplateRef }) content: TemplateRef<any>;
  @ContentChild('header', { read: TemplateRef }) header: TemplateRef<any>;

  @Input() card: ICard;


  constructor() { }

  ngOnInit(): void {}

}
