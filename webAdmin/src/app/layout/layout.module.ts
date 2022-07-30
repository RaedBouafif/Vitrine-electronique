import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TimelinesModule } from '@app/blocks/timelines/timelines.module';
import { AvatarsModule } from '@app/blocks/avatars/avatars.module';
import { UtilsModule } from '@app/blocks/utils';
import { ProgressModule } from '@app/blocks/progress/progress.module';
import { NavigationsModule } from '@app/blocks/navigations/navigations.module';

// Layout specific components
import { MainBodyComponent } from './components/main-body/main-body.component';
import { MenuTogglerComponent } from './components/menu-toggler/menu-toggler.component';
import { HeaderComponent } from './components/header-components/header/header.component';
import { HeaderSearchComponent } from './components/header-components/header-search/header-search.component';
import { HeaderMenuAppsComponent } from './components/header-components/header-menu-apps/header-menu-apps.component';
import { HeaderMenuMessagesComponent } from './components/header-components/header-menu-messages/header-menu-messages.component';
import { HeaderMenuNotificationsComponent } from './components/header-components/header-menu-notifications/header-menu-notifications.component';
import { HeaderUserAccountComponent } from './components/header-components/header-user-account/header-user-account.component';
import { QuickSidenavComponent } from './components/quick-sidenav-components/quick-sidenav/quick-sidenav.component';
import { SidenavComponent } from './components/sidenav-components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer-components/footer/footer.component';
import { QuickSidenavTasksComponent } from './components/quick-sidenav-components/quick-sidenav-tasks/quick-sidenav-tasks.component';
import { QuickSidenavContactsComponent } from './components/quick-sidenav-components/quick-sidenav-contacts/quick-sidenav-contacts.component';
import { QuickSidenavSettingsComponent } from './components/quick-sidenav-components/quick-sidenav-settings/quick-sidenav-settings.component';
import { SidenavItemComponent } from './components/sidenav-components/sidenav-item/sidenav-item.component';
import { SidenavLinkComponent } from './components/sidenav-components/sidenav-link/sidenav-link.component';
import { HeaderToolbarComponent } from './components/header-components/header-toolbar/header-toolbar.component';
import { HeaderNavbarComponent } from './components/header-components/header-navbar/header-navbar.component';
import { HeaderNavbarItemComponent } from './components/header-components/header-navbar-item/header-navbar-item.component';

// Main Layout Components, will be exported to be used in the Shell
import { VerticalLayoutDefaultComponent } from './vertical/vertical-layout-default/vertical-layout-default.component';
import { HorizontalLayoutDefaultComponent } from './horizontal/horizontal-layout-default/horizontal-layout-default.component';

const exports = [
  VerticalLayoutDefaultComponent,
  HorizontalLayoutDefaultComponent
];

@NgModule({
  declarations: [
    ...exports,
    HeaderComponent,
    HeaderSearchComponent,
    HeaderMenuAppsComponent,
    HeaderMenuMessagesComponent,
    HeaderMenuNotificationsComponent,
    HeaderUserAccountComponent,
    QuickSidenavComponent,
    SidenavComponent,
    MenuTogglerComponent,
    MainBodyComponent,
    FooterComponent,
    QuickSidenavTasksComponent,
    QuickSidenavContactsComponent,
    QuickSidenavSettingsComponent,
    SidenavItemComponent,
    SidenavLinkComponent,
    HeaderToolbarComponent,
    HeaderNavbarComponent,
    HeaderNavbarItemComponent
  ],
  imports: [
    SharedModule,
    UtilsModule,
    ProgressModule,
    TimelinesModule,
    AvatarsModule,
    NavigationsModule
  ],
  exports
})
export class LayoutModule {}
