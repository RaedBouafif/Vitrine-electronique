import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ImageService } from '@app/core/_services/image/image.service';
import { ArticleService } from '@app/core/_services/article/article.service';
import { CategoryService } from '@app/core/_services/category/category.service';
import { ColorsService, ColorScheme, ThemeColor, Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import {
  Article,
  Media,
  CategoryTable,
  Feature,
  PriceHistory
} from '@app/core/_models/Article';
import { Category, SubCategory } from '@app/core/_models/Category/Category';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const log = new Logger('Article');
import {
  faUserPlus,
  faFilter,
  faCircle,
  faTrash,
  faListUl,
  faTable,
  faUser,
  faEdit,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'prx-ui-tab-content',
  templateUrl: './ui-tab-content.component.html',
  styleUrls: ['./ui-tab-content.component.scss']
})
export class UiTabContentComponent implements OnInit {
  @Input()
  content: number = 1;

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
    delete: faTrash,
    ok: faCheck
  };
  editor = ClassicEditor;
  description = '';
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  isLoading: boolean;
  error: boolean;
  @Input()
  article: Article;
  categories: Category[] = [];
  files: File[] = [];
  @Input()
  selectedSubCategory: any[];
  table = [
    { name: 'Disponible' },
    { name: 'Non Disponible' },
    { name: 'Sur Commnade' }
  ];
  activetable = [
    { id: false, name: 'Non Actif' },
    { id: true, name: 'Actif' }
  ];
  feature = new Feature();
  articleId = '';
  poucentage: any = null;
  @Input()
  newMedia: any[] = [];
  constructor(
    private imageService: ImageService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private _colors: ColorsService,
    private _redirect: RedirectService
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategorys().subscribe(data => {
      this.categories = data.filter(item => item.active === true);
    });
  }
  addFeature() {
    let feature = new Feature();
    feature.name = this.feature.name;
    feature.value = this.feature.value;
    this.feature = new Feature();
    this.article.features.push(feature);
    this.article.features = [...this.article.features];
    if (this.datatable) {
      this.datatable.offset = this.article.features.length / 3;
    }
  }

  deleteFeature(feature: Feature) {
    let id = this.article.features.findIndex(item => item._id === feature._id);
    this.article.features.splice(id, 1);
  }
  addCategory(subCategory: SubCategory) {
    this.categories.forEach(cat => {
      let c = cat.subCategories.findIndex(i => i._id === subCategory._id);
      if (c !== -1) {
        let item = new CategoryTable();
        item.category = cat._id;
        item.subCategory = subCategory._id;
        this.article.categories.push(item);
      }
    });
  }
  delete(event: any) {
    let id = this.article.categories.findIndex(
      item => item.subCategory === event.value._id
    );
    this.article.categories.splice(id, 1);
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;

      this.addArticle();
    }
  }
  uploadImage(file: File, index: number, length: number) {
    let image = file.type.startsWith('image/');
    this.imageService.uploadImage(file).subscribe(
      data => {
        if (data) {
          this.newMedia.push({ type: image, media: new Media(data) });
          this.poucentage = (index * 100) / length;
          if (this.poucentage === 100) {
            setTimeout(() => {
              this.poucentage = null;
            }, 30000);
          }
          this.files.push(file);
        } else {
          this.isLoading = false;
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
  addArticle() {
    this.error = false;
    this.article.tax = this.article.tax / 100;
    this.articleService.updateArticle(this.article).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this._redirect.toArticle();
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
  onSelect(event: any) {
    this.poucentage = 2;
    event.addedFiles.forEach((file: File, index: number) =>
      this.uploadImage(file, index + 1, event.addedFiles.length)
    );
  }
  getFiles(type: string) {
    return this.files.filter(item => item.type.startsWith(type));
  }
  onRemove(event: any) {
    let id = this.files.indexOf(event);
    this.files.splice(id, 1);
    this.newMedia.splice(id, 1);
    console.log(this.newMedia);
  }
  deleteImage(id: number) {
    this.article.images.splice(id, 1);
  }
  getCategory(categoryT: CategoryTable): CategoryTable {
    let text = new CategoryTable();
    let category = this.categories.find(
      item => item._id === categoryT.category
    );
    if (category) {
      let sub = category.subCategories.find(
        item => item._id === categoryT.subCategory
      );
      if (sub) {
        text.category = category.categoryName;
        text.subCategory = sub.name;
      }
    }
    return text;
  }
}
