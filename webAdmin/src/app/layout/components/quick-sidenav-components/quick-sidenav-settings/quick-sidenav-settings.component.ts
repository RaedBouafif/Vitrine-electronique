import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '@app/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'prx-quick-sidenav-settings',
  templateUrl: './quick-sidenav-settings.component.html',
  styleUrls: ['./quick-sidenav-settings.component.scss']
})
export class QuickSidenavSettingsComponent extends BaseFormComponent
  implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    super();
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.form = this.formBuilder.group({
      dailySummaryEmails: [true],
      automaticResponse: [false],
      otherCanViewMyStatus: [false],
      allowRemoteAccess: [false],
      automaticSigning: [true],
      clearCacheOnLogoff: [true]
    });
  }
}
