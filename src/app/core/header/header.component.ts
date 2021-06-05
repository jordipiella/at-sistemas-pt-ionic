import { Component, Input, OnInit } from '@angular/core';
import { AppFacade } from '../services/app.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() inactiveLanguage: string;

  constructor(
    public appFacade: AppFacade
  ) { }

  ngOnInit(): void {}

  setLanguage(language: string): void {
    this.appFacade.setLanguage(language);
  }



}
