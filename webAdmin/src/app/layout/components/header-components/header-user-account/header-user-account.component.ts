import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';
import { AuthenticationService, BaseComponent, ColorScheme } from '@app/core';
import { Router } from '@angular/router';
import { Admin } from '@app/core/_models/user/Admin';
import { environment } from '@env/environment';

@Component({
  selector: 'prx-header-user-account',
  templateUrl: './header-user-account.component.html',
  styleUrls: ['./header-user-account.component.scss']
})
export class HeaderUserAccountComponent extends BaseComponent
  implements OnInit {
  @Input()
  user: Admin;

  @Input()
  credential: any;

  environment = environment;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    super();
  }
  ngOnInit() {}

  logout() {
    this.authenticationService.logout().subscribe(() => this.redirect());
  }

  redirect() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
