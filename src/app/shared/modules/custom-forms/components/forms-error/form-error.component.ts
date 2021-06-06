import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() error: string;
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {}



}
