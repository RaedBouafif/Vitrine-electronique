import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/core/_services/user/user.service';
import { Settings, MailItem } from '@app/core/_models/Settings';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ColorScheme, ThemeColor, ColorsService } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'prx-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.scss']
})
export class SettingsAccountComponent implements OnInit {
  editor = ClassicEditor;
  settings: Settings = new Settings();
  new: boolean;
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  mail: string = '';
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
  getSettings() {
    this.userService.getSettings().subscribe(data => {
      if (data) {
        this.new = false;
        this.settings = data;
        let value = data.mailList.find(item => item.name === 'Email principal');
        if (value) {
          this.mail = value.mail;
        }
      } else {
        this.new = true;
      }
    });
  }
  addSettings() {
    let item: MailItem = new MailItem();
    item.name = 'Email principal';
    item.mail = this.mail;
    this.settings.mailList.push(item);
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
    let itemindex = this.settings.mailList.findIndex(
      mail => mail.name === 'Email principal'
    );
    if (itemindex !== -1) {
      this.settings.mailList[itemindex].mail = this.mail;
    } else {
      let item: MailItem = new MailItem();
      item.name = 'Email principal';
      item.mail = this.mail;
      this.settings.mailList.push(item);
    }
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
