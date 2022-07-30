import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const exports = [BsDatepickerModule];

@NgModule({
  declarations: [],
  imports: [BsDatepickerModule],
  exports
})
export class DatePickersModule {}
