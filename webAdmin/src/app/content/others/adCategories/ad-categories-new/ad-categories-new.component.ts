import { Component, OnInit, ViewChild } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { RedirectService } from '@app/core/services/redirect.service';
import { CategoryService } from '@app/core/_services/category/category.service';
import { Logger } from '@app/core';
const log = new Logger('adcategory');
import {
  faUserPlus,
  faFilter,
  faCircle,
  faTrash,
  faListUl,
  faTable,
  faUser,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
import {
  AdCategory,
  AdSubCategory,
  Family
} from '@app/core/_models/Category/adCategory';
@Component({
  selector: 'prx-ad-categories-new',
  templateUrl: './ad-categories-new.component.html',
  styleUrls: ['./ad-categories-new.component.scss']
})
export class AdCategoriesNewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false })
  datatable: DatatableComponent;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  icons = {
    add: faUserPlus,
    filter: faFilter,
    dot: faCircle,
    edit: faEdit,
    list: faListUl,
    table: faTable,
    details: faUser,
    delete: faTrash
  };
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  isLoading: boolean;
  error: boolean;
  category: AdCategory = new AdCategory();
  subCategory = '';
  adsubCategory: AdSubCategory;
  family = '';
  constructor(
    private categoryService: CategoryService,
    private _colors: ColorsService,
    private _redirect: RedirectService
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }

  ngOnInit(): void {}
  addSubCategory() {
    let subCategory = new AdSubCategory(this.subCategory);
    this.subCategory = '';
    this.category.subCategories.push(subCategory);
    this.category.subCategories = [...this.category.subCategories];
    if (this.datatable) {
      this.datatable.offset = this.category.subCategories.length / 4;
    }
  }
  addFamily() {
    let id = this.category.subCategories.indexOf(this.adsubCategory);
    let family = new Family(this.family);
    this.family = '';
    this.adsubCategory = null;
    this.category.subCategories[id].families.push(family);
    this.category.subCategories[id].families = [
      ...this.category.subCategories[id].families
    ];
  }
  deleteFamily(subCategory: AdSubCategory, familyId: number) {
    let id = this.category.subCategories.indexOf(subCategory);
    this.category.subCategories[id].families.splice(familyId, 1);
  }
  delete(subCategory: AdSubCategory) {
    let id = this.category.subCategories.findIndex(
      item => item._id === subCategory._id
    );
    this.category.subCategories.splice(id, 1);
    this.category.subCategories = [...this.category.subCategories];
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      this.addCategory();
    }
  }

  addCategory() {
    this.error = false;

    this.categoryService.addAdCategory(this.category).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this._redirect.toAdCategory();
        } else {
          log.debug(`error`);
          this.error = true;
        }
      },
      error => {
        this.isLoading = false;
        this.error = true;
        log.debug(`error: ${error}`);
      }
    );
  }
}
