import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
import { UserService } from '@app/core/_services/user/user.service';
import { Provider } from '@app/core/_models/user/Provider';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
@Component({
  selector: 'prx-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false })
  table: DatatableComponent;
  filter = '';
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected: Provider[] = [];
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
  contacts: Provider[];
  users: Provider[];
  constructor(private userService: UserService) {}

  get totalCount(): string {
    return this.contacts ? `Total: ${this.contacts.length}` : '';
  }
  ngOnInit(): void {
    this.getProviderList();
  }
  getProviderList() {
    this.userService.getAllProviders().subscribe(users => {
      this.users = users;
      this.isLoading = false;
      this.contacts = users;
    });
  }
  delete(provider: Provider) {
    provider.deleted = true;
    this.userService.updateProvider(provider._id, provider).subscribe(data => {
      this.getProviderList();
    });
    /* this.userService.deleteProvider(provider._id).subscribe(data => {
      this.getProviderList();
    }); */
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getProviderList();
    } else {
      const filtered = this.users.filter((provider: Provider) => {
        return (
          provider.designation
            .toLowerCase()
            .indexOf(this.filter.toLowerCase()) !== -1
        );
      });

      // update the rows
      this.contacts = filtered;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }
}
