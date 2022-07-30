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
import { ColorScheme, ThemeColor, ColorsService } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '@app/core/_services/order/order.service';
import { PaymentMethod } from '@app/core/_models/Method';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'prx-settings-payment',
  templateUrl: './settings-payment.component.html',
  styleUrls: ['./settings-payment.component.scss']
})
export class SettingsPaymentComponent implements OnInit {
  @ViewChild('nameI') input: NgModel;
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
  name: string = '';
  new: boolean;
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  methods: PaymentMethod[] = [];
  method: PaymentMethod = new PaymentMethod();
  constructor(
    private orderService: OrderService,
    private _colors: ColorsService
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }

  ngOnInit() {
    this.getAllMethods();
  }
  getAllMethods() {
    this.orderService.getAllPaymentMethods().subscribe(data => {
      this.methods = data;
      this.new = true;
      this.method = new PaymentMethod();
      this.input.reset();
    });
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      if (this.new) {
        this.addMethod();
      } else {
        this.updateMethod(this.method);
      }
    }
  }
  addMethod() {
    this.orderService.addPaymentMethod(this.method).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this.getAllMethods();
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 10000);
        } else {
          this.error = true;
        }
      },
      error => {
        this.isLoading = false;
        this.error = true;
      }
    );
  }
  updateMethod(method: PaymentMethod) {
    this.orderService.updatePaymentMethod(method).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this.getAllMethods();
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 10000);
        } else {
          this.error = true;
        }
      },
      error => {
        this.isLoading = false;
        this.error = true;
      }
    );
  }
  delete(method: PaymentMethod) {
    method.deleted = true;
    this.updateMethod(method);
  }
  update(method: PaymentMethod, value: boolean) {
    method.active = value;
    this.updateMethod(method);
  }
}
