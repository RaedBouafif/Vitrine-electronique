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
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@app/core/_services/user/user.service';
import { Admin } from '@app/core/_models/user/Admin';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
@Component({
  selector: 'prx-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.scss']
})
export class AdministratorListComponent implements OnInit {
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
    details: faUser
  };
  isLoading = false;
  contacts: Admin[];
  users: Admin[];
  constructor(private userService: UserService) {}

  get totalCount(): string {
    return this.contacts ? `Total: ${this.contacts.length}` : '';
  }
  ngOnInit(): void {
    this.getAdminList();
  }
  getAdminList() {
    this.userService.getAllAdmins().subscribe(users => {
      this.users = users;
      this.isLoading = false;
      this.contacts = users;
    });
  }
  delete(admin: Admin) {
    admin.deleted = true;
    this.userService.updateAdmin(admin._id, admin).subscribe(data => {
      console.log(data);
      this.getAdminList();
    });
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getAdminList();
    } else {
      const filtered = this.users.filter((admin: Admin) => {
        return (
          admin.firstname.toLowerCase().indexOf(this.filter.toLowerCase()) !==
            -1 ||
          admin.lastname.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        );
      });

      // update the rows
      this.contacts = filtered;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }
}
