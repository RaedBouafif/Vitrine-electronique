import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule, ApplicationConfigurationService } from '@app/core';
import { SharedModule } from '@app/shared';
import { ShellModule } from './shell/shell.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './content/home/home.module';

import { AppComponent } from './app.component';
import {
  getBsDatepickerConfiguration,
  getBsModulesForRoot
} from './bootstrap/bootstrap.module';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

/**
 * Perfect Scrollbar Default Configuration
 **/
const defaultPerfectScrollbarConfiguration: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/**
 * Initializing Application
 * Here we load the configuration for the layout and some other stuffs that should be triggered once when the application is loading
 **/
const initializeApp = (_config: ApplicationConfigurationService) => {
  return () => _config.initialize();
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),

    CoreModule,
    ShellModule,
    SharedModule,
    AuthModule,
    PerfectScrollbarModule,

    // Ngx Bootstrap
    ...getBsModulesForRoot(),

    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    // App Initializer
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ApplicationConfigurationService],
      multi: true
    },

    // PerfectScrollbar Configuration
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: defaultPerfectScrollbarConfiguration
    },

    // Ngx-Bootstrap Datepicker Default Configuration
    {
      provide: BsDatepickerConfig,
      useFactory: getBsDatepickerConfiguration
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
