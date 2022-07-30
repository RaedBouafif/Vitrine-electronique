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
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Ad } from '@app/core/_models/Ad';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
import { CategoryService } from '@app/core/_services/category/category.service';
import { AdCategory } from '@app/core/_models/Category/adCategory';
import { BannerService } from '@app/core/_services/banner/banner.service';
@Component({
  selector: 'prx-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss']
})
export class AdListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false })
  table: DatatableComponent;
  filter = '';
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
    details: faUser,
    ok: faCheck,
    no: faTimes
  };
  isLoading = false;
  ads: Ad[];
  allAds: Ad[];
  categories: AdCategory[] = [];

  constructor(
    private adService: BannerService,
    private categoryService: CategoryService
  ) {}

  get totalCount(): string {
    return this.ads ? `Total: ${this.ads.length}` : '';
  }
  ngOnInit(): void {
    this.getAdList();
    this.getCategories();
  }
  getAdList() {
    this.adService.getAllAds().subscribe(allAds => {
      this.allAds = allAds;
      this.isLoading = false;
      this.ads = allAds;
    });
  }
  getCategories() {
    this.categoryService.getAllAdCategories().subscribe(data => {
      this.categories = data;
    });
  }
  getCategory(ad: Ad): any {
    let object = { category: '', subCategory: '', family: '' };
    let cat = this.categories.find(item => item._id === ad.category);
    object.category = cat.title;
    let sub = cat.subCategories.find(item => item._id === ad.subCategory);
    object.subCategory = sub.title;
    let family = sub.families.find(item => item._id === ad.family);
    object.family = family.title;
    return object;
  }
  update(ad: Ad, value: string) {
    ad.status = value;
    this.adService.updateAd(ad).subscribe(data => {
      this.getAdList();
    });
  }
  delete(ad: Ad) {
    this.adService.deleteAd(ad._id).subscribe(data => {
      this.getAdList();
    });
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getAdList();
    } else {
      const filtered = this.allAds.filter((ad: Ad) => {
        return ad.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
      });

      // update the rows
      this.ads = filtered;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }
  /**
   * The method receives the Banner as parameter, it's the object you assign to every row
   */
  toggleExpandRow(ad: Ad) {
    this.table.rowDetail.toggleExpandRow(ad);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }
}
