import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '@env/environment';
import {
  faCloudUploadAlt,
  faPen,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarSize } from '../models/avatar';

@Component({
  selector: 'prx-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  uploader: FileUploader;
  hasDragOver = false;

  icons = {
    upload: faCloudUploadAlt,
    edit: faPen,
    drop: faTrashAlt
  };

  @Input()
  avatar: Avatar;

  @Input()
  statusBorderColor: string;

  @Input()
  statusCssClass: string;

  @Input()
  placeholderBgColor: string;

  @Input()
  size: AvatarSize;

  @Input()
  showTooltip: boolean = false;

  // Editable Mode On
  @Input()
  editable: boolean = false;

  @Output()
  changed = new EventEmitter();

  constructor() {
    // This is where the file will be uploaded and processed
    const url = `${environment.serverUrl}/upload-file`;

    this.uploader = new FileUploader({
      url,
      disableMultipart: false,
      autoUpload: true
    });

    /*     this.uploader.response.subscribe((res: any) => {
      // The response should return a new URL for the uploaded image to take place
      this.avatar.picture =
        'https://randomuser.me/api/portraits/med/men/75.jpg';
      this.changed.emit(this.avatar);
    }); */
  }

  ngOnInit() {}
  upload(event: any) {
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _event => {
      this.avatar.file = file;
      this.avatar.picture = reader.result as any;
      this.changed.emit(this.avatar);
    };
  }
  public fileOver(e: any): void {
    this.hasDragOver = e;
  }
}
