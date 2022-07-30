import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ThemeColor, ColorsService } from '@app/core';

@Component({
  selector: 'prx-theme-color-picker',
  templateUrl: './theme-color-picker.component.html',
  styleUrls: ['./theme-color-picker.component.scss']
})
export class ThemeColorPickerComponent implements OnInit {
  colors: ThemeColor[];

  icons = {
    angleDown: faAngleDown
  };

  @Input()
  dropup: boolean = false;

  @Input()
  color: string = 'primary';

  @Input()
  current: ThemeColor = null;

  @Output()
  change: EventEmitter<ThemeColor> = new EventEmitter<ThemeColor>();

  constructor(private colorService: ColorsService) {}

  ngOnInit() {
    this.colors = this.colorService.ThemeColors;

    if (!this.current) {
      this.current = this.colors.find(e => e.value == 'primary');
    }
  }

  onChange(color: ThemeColor) {
    this.current = color;
    this.change.emit(color);
  }
}
