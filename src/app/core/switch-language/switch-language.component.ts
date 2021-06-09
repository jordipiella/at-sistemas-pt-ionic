import { Component, Input, OnInit } from '@angular/core';
import { AppFacade } from '../services/app.facade';

@Component({
  selector: 'app-switch-language',
  templateUrl: './switch-language.component.html',
  styleUrls: ['./switch-language.component.scss'],
})
export class SwitchLanguageComponent implements OnInit {

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
