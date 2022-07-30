import { Component, OnInit } from '@angular/core';
import { Provider } from '@app/core/_models/user/Provider';
import { UserService } from '@app/core/_services/user/user.service';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
import { ActivatedRoute, Router } from '@angular/router';
const log = new Logger('provider');
@Component({
  selector: 'prx-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.scss']
})
export class ProviderEditComponent implements OnInit {
  providerId: string;
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  provider = new Provider();
  isLoading: boolean;
  error: boolean;

  table = [
    { id: false, name: 'Non Actif' },
    { id: true, name: 'Actif' }
  ];
  constructor(
    private providerService: UserService,
    private _colors: ColorsService,
    private _redirect: RedirectService,
    private _router: ActivatedRoute
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }

  ngOnInit(): void {
    this._router.params.subscribe(params => this.fetchUser(params['id']));
  }
  private fetchUser(id: string) {
    this.isLoading = true;
    this.providerId = id;

    this.providerService.getProviderById(id).subscribe((provider: Provider) => {
      this.isLoading = false;
      this.provider = provider;
    });
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      this.error = false;
      this.providerService
        .updateProvider(this.providerId, this.provider)
        .subscribe(
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
