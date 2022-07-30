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
import { ActivatedRoute } from '@angular/router';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
@Component({
  selector: 'prx-ad-categories-edit',
  templateUrl: './ad-categories-edit.component.html',
  styleUrls: ['./ad-categories-edit.component.scss']
})
export class AdCategoriesEditComponent implements OnInit {
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

  table = [
    { id: false, name: 'Non Actif' },
    { id: true, name: 'Actif' }
  ];
  categoryId = '';
  constructor(
    private categoryService: CategoryService,
    private _colors: ColorsService,
    private _redirect: RedirectService,
    private _router: ActivatedRoute
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }

  ngOnInit(): void {
    this._router.params.subscribe(params => this.fetchUser(params['id']));
  }
  private fetchUser(id: string) {
    this.categoryId = id;
    this.categoryService.getAdCategory(id).subscribe((category: AdCategory) => {
      this.category = category;
      this.filter();
    });
  }
  filter() {
    this.category.subCategories = this.category.subCategories.filter(
      item => item.deleted === false
    );
    this.category.subCategories.forEach(item => {
      item.families = item.families.filter(fam => fam.deleted === false);
    });
  }
  addSubCategory() {
    let subCategory = new AdSubCategory(this.subCategory);
    this.subCategory = '';
    this.category.subCategories.push(subCategory);
    this.category.subCategories = [...this.category.subCategories];
    if (this.datatable) {
      this.datatable.offset = this.category.subCategories.length / 4;
    }
  }
  update(subCategory: AdSubCategory, Actif: boolean) {
    let id = this.category.subCategories.findIndex(
      item => item._id === subCategory._id
    );
    this.category.subCategories[id].active = Actif;
    this.category.subCategories = [...this.category.subCategories];
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
  updateFamily(subCategory: AdSubCategory, family: Family, Actif: boolean) {
    let id = this.category.subCategories.findIndex(
      item => item._id === subCategory._id
    );
    let familyID = this.category.subCategories[id].families.indexOf(family);
    this.category.subCategories[id].families[familyID].active = Actif;
    this.category.subCategories[id].families = [
      ...this.category.subCategories[id].families
    ];
  }
  deleteFamily(subCategory: AdSubCategory, family: Family) {
    let id = this.category.subCategories.findIndex(
      item => item._id === subCategory._id
    );
    let familyID = this.category.subCategories[id].families.indexOf(family);
    this.category.subCategories[id].families[familyID].deleted = true;
    this.category.subCategories[id].families = [
      ...this.category.subCategories[id].families
    ];
    this.filter();
  }
  delete(subCategory: AdSubCategory) {
    let id = this.category.subCategories.findIndex(
      item => item._id === subCategory._id
    );
    this.category.subCategories[id].deleted = true;
    this.category.subCategories = [...this.category.subCategories];
    this.filter();
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      this.updateCategory();
    }
  }

  updateCategory() {
    this.error = false;

    this.categoryService.updateAdCategory(this.category).subscribe(
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
  /**
   * The method receives the User as parameter, it's the object you assign to every row
   */
  toggleExpandRow(subCategory: AdSubCategory) {
    this.datatable.rowDetail.toggleExpandRow(subCategory);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }
}
