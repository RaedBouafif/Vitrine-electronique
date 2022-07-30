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
  faUser,
  faCheck,
  faTimes,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { BannerService } from '@app/core/_services/banner/banner.service';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
import { Banner } from '@app/core/_models/Banner';

@Component({
  selector: 'prx-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false })
  table: DatatableComponent;
  filter = '';
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  icons = {
    add: faUserPlus,
    filter: faFilter,
    dot: faCircle,
    edit: faEdit,
    copy: faCopy,
    delete: faTrash,
    list: faListUl,
    table: faTable,
    details: faUser,
    ok: faCheck,
    no: faTimes
  };
  isLoading = false;
  banners: Banner[];
  allBanners: Banner[];
  constructor(private bannerService: BannerService) {}

  get totalCount(): string {
    return this.banners ? `Total: ${this.banners.length}` : '';
  }
  ngOnInit(): void {
    this.getBannerList();
  }
  getBannerList() {
    this.bannerService.getAllBanners().subscribe(allBanners => {
      this.allBanners = allBanners;
      this.isLoading = false;
      this.banners = allBanners;
    });
  }

  delete(banner: Banner) {
    this.bannerService.deleteBanner(banner._id).subscribe(data => {
      this.getBannerList();
    });
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getBannerList();
    } else {
      const filtered = this.allBanners.filter((banner: Banner) => {
        return (
          banner.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        );
      });

      // update the rows
      this.banners = filtered;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }
  /**
   * The method receives the Banner as parameter, it's the object you assign to every row
   */
  toggleExpandRow(banner: Banner) {
    this.table.rowDetail.toggleExpandRow(banner);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }
}
