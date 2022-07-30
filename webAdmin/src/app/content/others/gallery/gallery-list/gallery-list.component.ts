import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faUserPlus,
  faFilter,
  faCircle,
  faUserEdit,
  faCopy,
  faTrash,
  faListUl,
  faTable,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { ImageService } from '@app/core/_services/image/image.service';
import { Image } from '@app/core/_models/Image';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
import { Avatar } from '@app/blocks/avatars/models/avatar';

@Component({
  selector: 'prx-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  icons = {
    add: faUserPlus,
    filter: faFilter,
    dot: faCircle,
    edit: faUserEdit,
    copy: faCopy,
    delete: faTrash,
    list: faListUl,
    table: faTable,
    details: faUser
  };
  isLoading = false;
  images: Image[];
  constructor(private imageService: ImageService) {}

  get totalCount(): string {
    return this.images ? `Total: ${this.images.length}` : '';
  }

  ngOnInit(): void {
    this.getImageList();
  }
  getAvatar(image: Image): Avatar {
    return {
      name: image.title,
      picture: image.path
    };
  }
  getImageList() {
    this.imageService.getAllImages().subscribe(images => {
      this.images = images;
      this.isLoading = false;
    });
  }
  update(image: Image, value: boolean) {
    image.active = value;
    this.imageService.updateImage(image).subscribe(data => {
      this.getImageList();
    });
  }
  delete(image: Image) {
    this.imageService.deleteImage(image._id).subscribe(data => {
      this.getImageList();
    });
  }
}
