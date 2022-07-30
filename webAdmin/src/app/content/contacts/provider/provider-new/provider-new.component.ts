import { Component, OnInit } from '@angular/core';
import { Provider } from '@app/core/_models/user/Provider';
import { UserService } from '@app/core/_services/user/user.service';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
const log = new Logger('provider');
@Component({
  selector: 'prx-provider-new',
  templateUrl: './provider-new.component.html',
  styleUrls: ['./provider-new.component.scss']
})
export class ProviderNewComponent implements OnInit {
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  provider = new Provider();
  isLoading: boolean;
  error: boolean;

  constructor(
    private providerService: UserService,
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

      this.providerService.addProvider(this.provider).subscribe(
        data => {
          this.isLoading = false;
          if (data) {
            this._redirect.toProvider();
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
