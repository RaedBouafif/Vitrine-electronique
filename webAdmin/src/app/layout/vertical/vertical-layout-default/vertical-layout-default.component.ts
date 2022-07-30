import {
  Component,
  OnInit,
  HostBinding,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { BaseLayout } from '../../base/base-layout';
import { CredentialsService } from '@app/core';

import { AuthorizationEntity } from '@app/core/authentication/authentication.models';
import { Admin } from '@app/core/_models/user/Admin';
import { UserService } from '@app/core/_services/user/user.service';

@Component({
  selector: 'prx-vertical-layout-default',
  templateUrl: './vertical-layout-default.component.html',
  styleUrls: ['./vertical-layout-default.component.scss']
})
export class VerticalLayoutDefaultComponent extends BaseLayout
  implements OnInit {
  @HostBinding('class.fixed-sidenav')
  @Input()
  fixedSidenav: boolean;

  // This var controls the collapsed state of the quick side navigation, it starts collapsed
  @Input()
  sidenavCollapsed: boolean;

  @Input()
  mobileCollapsed: boolean;

  credential: any;
  user: Admin = new Admin();
  constructor(
    private credentialsService: CredentialsService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.credential = this.credentialsService.credentials;

    this.getUser(this.credential.accessToken);
  }

  getUser(id: string) {
    this.userService.getAdminById(id).subscribe(data => {
      this.user = data;
    });
  }
  /*
   * Handles the main side navigation toggled stated
   */
  onSidenavToggled(collapsed: boolean) {
    this.sidenavCollapsed = collapsed;
  }
}
