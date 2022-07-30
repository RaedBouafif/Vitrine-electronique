import { Component, OnInit, ViewChild } from '@angular/core';
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
import { AdCategory } from '@app/core/_models/Category/adCategory';
import { CategoryService } from '@app/core/_services/category/category.service';
@Component({
  selector: 'prx-ad-categories-list',
  templateUrl: './ad-categories-list.component.html',
  styleUrls: ['./ad-categories-list.component.scss']
})
export class AdCategoriesListComponent implements OnInit {
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
    list: faListUl,
    table: faTable,
    details: faUser,
    delete: faTrash
  };
  isLoading = false;
  allCategories: AdCategory[];
  categories: AdCategory[];
  constructor(private categoryService: CategoryService) {}

  get totalCount(): string {
    return this.categories ? `Total: ${this.categories.length}` : '';
  }

  ngOnInit(): void {
    this.getCategoryList();
  }
  getCategoryList() {
    this.categoryService.getAllAdCategories().subscribe(categories => {
      this.allCategories = categories;
      this.categories = categories;
      this.isLoading = false;
    });
  }
  delete(category: AdCategory) {
    category.deleted = true;
    this.categoryService.updateAdCategory(category).subscribe(data => {
      this.getCategoryList();
    });
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getCategoryList();
    } else {
      const filtered = this.allCategories.filter((category: AdCategory) => {
        return (
          category.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        );
      });

      // update the rows
      this.categories = filtered;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }
}
