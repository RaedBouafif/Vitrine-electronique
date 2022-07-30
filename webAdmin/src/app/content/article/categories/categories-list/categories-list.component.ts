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
import { Avatar } from '@app/blocks/avatars/models/avatar';
import { Category } from '@app/core/_models/Category/Category';
import { CategoryService } from '@app/core/_services/category/category.service';
@Component({
  selector: 'prx-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
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
  allCategories: Category[];
  categories: Category[];
  constructor(private categoryService: CategoryService) {}

  get totalCount(): string {
    return this.categories ? `Total: ${this.categories.length}` : '';
  }

  ngOnInit(): void {
    this.getCategoryList();
  }
  getAvatar(category: Category): Avatar {
    return {
      name: category.categoryName,
      picture: category.image
    };
  }
  getCategoryList() {
    this.categoryService.getAllCategorys().subscribe(categories => {
      this.allCategories = categories;
      this.categories = categories;
      this.isLoading = false;
    });
  }
  delete(category: Category) {
    this.categoryService.deleteCategory(category._id).subscribe(data => {
      this.getCategoryList();
    });
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getCategoryList();
    } else {
      const filtered = this.allCategories.filter((category: Category) => {
        return (
          category.categoryName
            .toLowerCase()
            .indexOf(this.filter.toLowerCase()) !== -1
        );
      });

      // update the rows
      this.categories = filtered;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }
}
