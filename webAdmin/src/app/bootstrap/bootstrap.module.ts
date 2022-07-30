import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {
  BsDatepickerModule,
  BsDatepickerConfig
} from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { PaginationModule } from 'ngx-bootstrap/pagination';

export const getBsDatepickerConfiguration = (): BsDatepickerConfig => {
  return Object.assign(new BsDatepickerConfig(), {
    containerClass: 'theme-primary'
  });
};

export function getBsModulesForRoot() {
  return [
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    PaginationModule.forRoot()
  ];
}

const exportModules = [
  // BS Modules
  AccordionModule,
  BsDatepickerModule,
  BsDropdownModule,
  ButtonsModule,
  CollapseModule,
  TabsModule,
  ModalModule,
  TooltipModule,
  PopoverModule,
  RatingModule,
  PaginationModule
];

@NgModule({
  declarations: [],
  imports: [...exportModules],
  exports: [...exportModules]
})
export class BootstrapModule {}
