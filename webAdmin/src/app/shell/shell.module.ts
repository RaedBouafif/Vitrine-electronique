import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/layout/layout.module';

import { ShellComponent } from './components/shell/shell.component';

@NgModule({
  imports: [CommonModule, LayoutModule],
  declarations: [ShellComponent]
})
export class ShellModule {}
