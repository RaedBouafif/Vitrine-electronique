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
import { Customer } from '@app/core/_models/user/Customer';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';

@Component({
  selector: 'prx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
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
  contacts: Customer[];
  users: Customer[];
  constructor(private userService: UserService) {}

  get totalCount(): string {
    return this.contacts ? `Total: ${this.contacts.length}` : '';
  }
  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList() {
    this.userService.getAllCustomers().subscribe(users => {
      this.users = users;
      this.isLoading = false;
      this.contacts = users;
    });
  }
  update(customer: Customer, value: boolean) {
    customer.active = value;
    this.userService.updateCustomer(customer._id, customer).subscribe(data => {
      this.getCustomerList();
    });
  }
  delete(customer: Customer) {
    customer.deleted = true;
    this.userService.updateCustomer(customer._id, customer).subscribe(data => {
      this.getCustomerList();
    });
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getCustomerList();
    } else {
      const filtered = this.users.filter((customer: Customer) => {
        return (
          customer.firstname
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
  /**
   * The method receives the User as parameter, it's the object you assign to every row
   */
  toggleExpandRow(customer: Customer) {
    this.table.rowDetail.toggleExpandRow(customer);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }
}
