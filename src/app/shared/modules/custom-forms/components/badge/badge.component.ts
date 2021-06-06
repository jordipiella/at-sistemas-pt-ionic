import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {

  @Input() badges: string[] = [];
  @Input() deleteOption: boolean = false;
  @Output() badgeClicked: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {}

  clickBadge(index: number): void {
    this.badgeClicked.emit(index);
  }

}
