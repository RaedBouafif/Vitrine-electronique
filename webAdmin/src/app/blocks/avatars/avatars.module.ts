import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { IconsModule } from '@app/blocks/icons/icons.module';

import { AvatarComponent } from './avatar/avatar.component';
import { AvatarInfoComponent } from './avatar-info/avatar-info.component';
import { AvatarListComponent } from './avatar-list/avatar-list.component';

@NgModule({
  declarations: [AvatarComponent, AvatarListComponent, AvatarInfoComponent],
  imports: [CommonModule, IconsModule, FileUploadModule],
  exports: [AvatarComponent, AvatarListComponent, AvatarInfoComponent]
})
export class AvatarsModule {}
