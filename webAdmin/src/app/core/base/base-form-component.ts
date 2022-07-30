import { FormGroup } from '@angular/forms';
import { BaseComponent } from './base-component';

export class BaseFormComponent extends BaseComponent {
  public error: string;
  public form: FormGroup;
}
