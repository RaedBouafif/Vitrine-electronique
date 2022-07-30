import { Component, OnInit } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ColorsService, ColorScheme, ThemeColor } from '@app/core';
import { AlertStyle } from '@app/blocks/alerts/models/alert-style.enum';
import { Logger } from '@app/core';
import { RedirectService } from '@app/core/services/redirect.service';
import { Image } from '@app/core/_models/Image';
import { ImageService } from '@app/core/_services/image/image.service';
const log = new Logger('Image');

@Component({
  selector: 'prx-gallery-new',
  templateUrl: './gallery-new.component.html',
  styleUrls: ['./gallery-new.component.scss']
})
export class GalleryNewComponent implements OnInit {
  ColorScheme = ColorScheme;
  AlertStyle = AlertStyle;
  colors: ThemeColor[];
  longArrowAltRight = faLongArrowAltRight;
  image = new Image();
  isLoading: boolean;
  error: boolean;
  constructor(
    private imageService: ImageService,
    private _colors: ColorsService,
    private _redirect: RedirectService
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
            this.addImage(data);
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

  addImage(path: string) {
    this.image.path = path;
    this.error = false;

    this.imageService.addImage(this.image).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this._redirect.toGallery();
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
