import { Component, OnInit } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
import { ImageService } from '@app/core/_services/image/image.service';
import { BannerService } from '@app/core/_services/banner/banner.service';
import { Banner } from '@app/core/_models/Banner';
import { ActivatedRoute } from '@angular/router';
const log = new Logger('Banner');
@Component({
  selector: 'prx-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss']
})
export class BannerEditComponent implements OnInit {
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

  table = [
    { id: false, name: 'Non Actif' },
    { id: true, name: 'Actif' }
  ];
  Id: string;
  constructor(
    private imageService: ImageService,
    private _colors: ColorsService,
    private _redirect: RedirectService,
    private bannerService: BannerService,
    private _router: ActivatedRoute
  ) {
    this.colors = this._colors.ThemeColors;
    this.isLoading = false;
    this.error = false;
  }
  file: File = null;

  ngOnInit(): void {
    this._router.params.subscribe(params => this.fetch(params['id']));
  }
  private fetch(id: string) {
    this.Id = id;
    this.bannerService.getBanner(id).subscribe((banner: Banner) => {
      this.banner = banner;
    });
  }

  submit({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      if (this.file !== null) {
        this.uploadImage();
      } else {
        this.updateBanner();
      }
    }
  }
  uploadImage() {
    this.isLoading = true;
    this.imageService.uploadImage(this.file).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          console.log(data);
          this.banner.image = data;
          this.updateBanner();
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
  onSelect(event: any) {
    this.file = event.addedFiles[0];
  }

  onRemove(event: any) {
    this.file = null;
  }

  updateBanner() {
    this.error = false;
    this.bannerService.updateBanner(this.banner).subscribe(
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
