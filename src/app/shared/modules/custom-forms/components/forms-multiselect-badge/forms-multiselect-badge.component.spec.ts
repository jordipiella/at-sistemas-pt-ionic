import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsMultiSelectBadgeComponent } from './forms-multiselect-badge.component';


describe('FormsMultiSelectBadgeComponent', () => {
  let component: FormsMultiSelectBadgeComponent;
  let fixture: ComponentFixture<FormsMultiSelectBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsMultiSelectBadgeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormsMultiSelectBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
