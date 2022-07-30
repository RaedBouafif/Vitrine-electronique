import { Component, OnInit } from '@angular/core';
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
import { UserService } from '@app/core/_services/user/user.service';
import { Settings, Link } from '@app/core/_models/Settings';
import { ColorScheme, ThemeColor, ColorsService } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'prx-settings-links',
  templateUrl: './settings-links.component.html',
  styleUrls: ['./settings-links.component.scss']
})
export class SettingsLinksComponent implements OnInit {
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
  settings: Settings = new Settings();
  link: string = '';
  name: string = '';
  new: boolean;
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  constructor(
    private userService: UserService,
    private _colors: ColorsService
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }

  ngOnInit() {
    this.getSettings();
  }
  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      if (this.new) {
        this.addSettings();
      } else {
        this.updateSettings();
      }
    }
  }
  add() {
    let l = new Link();
    l.name = this.name;
    l.link = this.link;
    this.settings.links.push(l);
    this.settings.links = [...this.settings.links];
  }
  delete(link: Link) {
    let id = this.settings.links.indexOf(link);
    this.settings.links.splice(id, 1);
    this.settings.links = [...this.settings.links];
  }
  getSettings() {
    this.userService.getSettings().subscribe(data => {
      console.log(data);
      if (data) {
        this.new = false;
        this.settings = data;
      } else {
        this.new = true;
      }
    });
  }
  addSettings() {
    this.userService.addSettings(this.settings).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
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
  updateSettings() {
    this.userService.updateSettings(this.settings).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
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
}
