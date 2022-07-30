import { Component, OnInit } from '@angular/core';
import { Admin } from '@app/core/_models/user/Admin';
import { UserService } from '@app/core/_services/user/user.service';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
const log = new Logger('admin');
@Component({
  selector: 'prx-administrator-new',
  templateUrl: './administrator-new.component.html',
  styleUrls: ['./administrator-new.component.scss']
})
export class AdministratorNewComponent implements OnInit {
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  admin = new Admin();
  isLoading: boolean;
  error: boolean;
  table = [
    { id: 1, name: 'Super Admin' },
    { id: 2, name: 'Admin' }
  ];
  constructor(
    private adminService: UserService,
    private _colors: ColorsService,
    private _redirect: RedirectService
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }

  ngOnInit(): void {}

  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      this.error = false;

      this.adminService.addAdmin(this.admin).subscribe(
        data => {
          this.isLoading = false;
          if (data) {
            this._redirect.toAdmin();
          } else {
            log.debug(`error`);
            this.error = true;
          }
        },
        error => {
          this.isLoading = false;
          this.error = true;
          log.debug(`error: ${error}`);
        }
      );
    }
  }
}
