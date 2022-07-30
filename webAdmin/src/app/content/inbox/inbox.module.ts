import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AvatarsModule } from '@app/blocks/avatars/avatars.module';
import { UtilsModule } from '@app/blocks/utils';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxSidebarComponent } from './components/inbox-sidebar/inbox-sidebar.component';
import { InboxListComponent } from './components/inbox-list/inbox-list.component';
import { InboxDetailsComponent } from './components/inbox-details/inbox-details.component';
import { InboxComponent } from './components/inbox/inbox.component';

@NgModule({
  declarations: [
    InboxComponent,
    InboxSidebarComponent,
    InboxListComponent,
    InboxDetailsComponent
  ],
  imports: [
    SharedModule,
    UtilsModule,
    AvatarsModule,
    InboxRoutingModule,
    CKEditorModule
  ]
})
export class InboxModule {}
