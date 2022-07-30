import { Component, OnInit } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
import { ImageService } from '@app/core/_services/image/image.service';
import { BannerService } from '@app/core/_services/banner/banner.service';
import { Banner } from '@app/core/_models/Banner';
const log = new Logger('Banner');
@Component({
  selector: 'prx-banner-new',
  templateUrl: './banner-new.component.html',
  styleUrls: ['./banner-new.component.scss']
})
export class BannerNewComponent implements OnInit {
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  banner = new Banner();
  isLoading: boolean;
  error: boolean;
  locations = [
    { id: '1', name: 'Colonne Gauche' },
    { id: '2', name: 'Colonne Droite' }
  ];
  types = [
    { id: '1', name: 'Image' },
    { id: '2', name: 'Flash' }
  ];
  constructor(
    private imageService: ImageService,
    private _colors: ColorsService,
    private _redirect: RedirectService,
    private bannerService: BannerService
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }
  file: File = null;

  ngOnInit(): void {}

  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;
      this.imageService.uploadImage(this.file).subscribe(
        data => {
          this.isLoading = false;
          if (data) {
            this.addBanner(data);
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
  }
  onSelect(event: any) {
    this.file = event.addedFiles[0];
  }

  onRemove(event: any) {
    this.file = null;
  }

  addBanner(path: string) {
    this.banner.image = path;
    this.error = false;
    this.bannerService.addBanner(this.banner).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this._redirect.toBanner();
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
}
