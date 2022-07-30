import { Component, OnInit } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
import { ImageService } from '@app/core/_services/image/image.service';
import { CategoryService } from '@app/core/_services/category/category.service';
import { Category, SubCategory } from '@app/core/_models/Category/Category';
import { Avatar } from '@app/blocks/avatars/models/avatar';
const log = new Logger('provider');
@Component({
  selector: 'prx-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss']
})
export class CategoriesNewComponent implements OnInit {
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
    private _redirect: RedirectService
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
  ngOnInit(): void {}
  addSubCategory() {
    let subCategory = new SubCategory();
    subCategory.active = true;
    subCategory.name = this.subCategory;
    this.subCategory = '';
    this.category.subCategories.push(subCategory);
  }
  delete(id: number) {
    this.category.subCategories.splice(id, 1);
  }
  onUrlChanged(avatar: Avatar) {
    this.avatar = avatar;
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      this.imageService.uploadImage(this.avatar.file).subscribe(
        data => {
          this.isLoading = false;
          if (data) {
            this.addCategory(data);
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

  addCategory(path: string) {
    this.category.image = path;
    this.error = false;

    this.categoryService.addCategory(this.category).subscribe(
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
