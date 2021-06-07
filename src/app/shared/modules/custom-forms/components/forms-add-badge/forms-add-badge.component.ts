import { Component, forwardRef, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';


@Component({
  selector: 'app-forms-add-badge',
  templateUrl: './forms-add-badge.component.html',
  styleUrls: ['./forms-add-badge.component.scss']
})
export class FormsAddBadgeComponent implements OnInit, ControlValueAccessor {
  onChanged: any;
  onTouched: any;
  badges: string[] = [];

  addBadgeForm: FormGroup = this.fb.group({
    badgeText: []
  });

  disabled: boolean;

  constructor(
    private fb: FormBuilder,
    @Self() @Optional() private ngControl: NgControl
  ) {
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
      else {
        this.onChanged = () => null;
        this.onTouched = () => null;
      }
  }

  ngOnInit(): void {
  }

  onInput(value: string[]) {
    this.badges = value;
    this.onTouched();
    this.onChanged(this.badges);
  }

  writeValue(value: string[]): void {
    this.badges = value || [];
    this.badges = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addBadge(): void {
    const badge: string = this.addBadgeForm.get('badgeText').value;
    if (!badge) {
      return;
    }
    this.addBadgeForm.get('badgeText').setValue('');
    this.badges.push(badge);
  }

  removeBadge(index: number) {
    this.badges.splice(index, 1);
  }

}
