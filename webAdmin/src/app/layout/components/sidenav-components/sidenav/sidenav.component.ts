import {
  Component,
  OnInit,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { AuthenticationService, Logger } from '@app/core';
import { Router } from '@angular/router';
import {
  faInbox,
  faLock,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '@app/layout/services/navigation.service';
import { NavigationOptions } from '@app/layout/models/navigation';
import { MessageService } from '@app/core/_services/messaging/message.service';
import { Admin } from '@app/core/_models/user/Admin';
import { environment } from '@env/environment';

const logger = new Logger('SidenavComponent');

@Component({
  selector: 'prx-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  host: { class: 'sidenav' }
})
export class SidenavComponent implements OnInit {
  @HostBinding('class.fixed')
  @Input()
  fixed: boolean;

  @HostBinding('class.hover')
  hover: boolean;

  @HostListener('mouseenter')
  onMouseOver() {
    this.hover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hover = false;
  }

  user: any = {
    avatar: {
      picture: environment.assets + 'img/icons/profile-placeholder.png',
      name: '',
      status: 'online'
    }
  };

  icons = {
    faInbox,
    faLock,
    faSignOutAlt
  };

  navGroups: NavigationOptions[];

  @Output()
  sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.collapsed')
  @Input()
  collapsed: boolean;

  @Input()
  credential: any;

  messageCount = 0;
  constructor(
    private router: Router,
    private navigation: NavigationService,
    private authenticationService: AuthenticationService,
    private messagesService: MessageService
  ) {}

  ngOnInit() {
    this.user.avatar.name = this.credential.fullName;
    this.getMessageCount();
    setInterval(() => {
      this.getMessageCount();
    }, 3600000);
    this.navigation
      .getNavigationItems()
      .subscribe(groups => (this.navGroups = groups));
  }
  getMessageCount() {
    this.messagesService.getNewMessagesCount().subscribe(messages => {
      logger.debug('Messages', messages);
      this.messageCount = messages;
    });
  }
  toggleSidenav() {
    this.collapsed = !this.collapsed;
    this.sideNavToggled.emit(this.collapsed);
  }

  logout() {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  onNavLinkToggle(isOpen: boolean) {
    logger.debug(`Nav link toggled ${isOpen}`);
  }
}
