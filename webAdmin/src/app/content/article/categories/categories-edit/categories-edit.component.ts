import { Component, OnInit, ViewChild } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
import { ImageService } from '@app/core/_services/image/image.service';
import { CategoryService } from '@app/core/_services/category/category.service';
import { Category, SubCategory } from '@app/core/_models/Category/Category';
import { Avatar } from '@app/blocks/avatars/models/avatar';
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
import { ActivatedRoute } from '@angular/router';
const log = new Logger('category');
@Component({
  selector: 'prx-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {
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
  category: Category = new Category();
  constructor(
    private imageService: ImageService,
    private categoryService: CategoryService,
    private _colors: ColorsService,
    private _redirect: RedirectService,
    private _router: ActivatedRoute
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }
  file: File = null;
  subCategory = '';
  private _avatar: Avatar = {
    name: ''
  };

  get avatar(): Avatar {
    return this._avatar;
  }
  set avatar(value: Avatar) {
    this._avatar = value;
  }
  table = [
    { id: false, name: 'Non Actif' },
    { id: true, name: 'Actif' }
  ];
  categoryId = '';
  ngOnInit(): void {
    this._router.params.subscribe(params => this.fetchUser(params['id']));
  }
  private fetchUser(id: string) {
    this.categoryId = id;
    this.categoryService.getCategory(id).subscribe((category: Category) => {
      this.category = category;
      this.avatar.picture = category.image;
    });
  }
  addSubCategory() {
    let subCategory = new SubCategory();
    subCategory.active = true;
    subCategory.name = this.subCategory;
    this.subCategory = '';
    this.category.subCategories.push(subCategory);
    this.category.subCategories = [...this.category.subCategories];
    if (this.datatable) {
      this.datatable.offset = this.category.subCategories.length / 4;
    }
  }
  update(subCategory: SubCategory, value: boolean) {
    subCategory.active = value;
  }
  delete(subCategory: SubCategory) {
    let id = this.category.subCategories.findIndex(
      item => item._id === subCategory._id
    );
    this.category.subCategories.splice(id, 1);
  }
  onUrlChanged(avatar: Avatar) {
    this.avatar = avatar;
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid && this.avatar.file) {
      this.isLoading = true;
      this.imageService.uploadImage(this.avatar.file).subscribe(
        data => {
          this.isLoading = false;
          if (data) {
            this.updateCategory(data);
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
    } else {
      this.updateCategory();
    }
  }

  updateCategory(path?: string) {
    if (path) {
      this.category.image = path;
    }

    this.error = false;

    this.categoryService.updateCategory(this.category).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this._redirect.toCategory();
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
