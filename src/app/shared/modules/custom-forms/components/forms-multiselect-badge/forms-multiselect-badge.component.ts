import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forms-multiselect-badge',
  templateUrl: './forms-multiselect-badge.component.html',
  styleUrls: ['./forms-multiselect-badge.component.scss']
})
export class FormsMultiSelectBadgeComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() options: any[] = []
  @Input() label: string = 'label';
  @Input() labelValue: string = 'id';

  onChanged: any;
  onTouched: any;
  badges: any[] = [];

  form: FormGroup = this.fb.group({
    badgeSelect: []
  });

  disabled: boolean;
  subscriptions: Subscription[] = [];

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
    const valueSub: Subscription = this.form.get('badgeSelect').valueChanges
      .pipe(
        tap((value: string) => this.addBadge(value))
      ).subscribe()
    this.subscriptions.push(valueSub);
  }

  ngOnDestroy(): void {
    this.options.map((option: any) => {
      delete option.disabled;
      return option;
    });
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  onInput(value: any[]) {
    this.badges = value;
    this.onTouched();
    this.onChanged(this.badges);
  }

  writeValue(value: any[]): void {
    this.badges = value || [];
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

  addBadge(value: string): void {
    if (!value) {
      return;
    }
    const option: any = this.options.find((option: any) => option[this.labelValue] === parseInt(value));
    const findInBadges: boolean = this.badges.some((badge: any) => badge === option);
    if (!findInBadges && option) {
      this.badges.push(option);
      option.disabled = true;
    }
    this.form.get('badgeSelect').setValue(null);
  }

  removeBadge(index: number) {
    delete this.options[index].disabled;
    this.badges.splice(index, 1);
  }

  get badgesFormatted(): string[] {
    const filterBadges: any[] = this.badges.filter((badge: any)=> badge[this.label]);
    const formatBadges: any[] = (filterBadges?.length) ? filterBadges.map((badge: any) => badge[this.label]) : [];
    return formatBadges;
  }

}
