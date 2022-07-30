import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  faLink,
  faEnvelope,
  faPhone,
  faMapMarker
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  icons = {
    link: faLink,
    mail: faEnvelope,
    phone: faPhone,
    location: faMapMarker
  };

  addressHidden: boolean;

  @ViewChild('addressView', { static: false })
  addressView: ElementRef;

  @Input()
  url: string;

  @Input()
  email: string;

  @Input()
  phone: string;

  @Input()
  address: string;

  constructor(private cdRef: ChangeDetectorRef) {
    super('address');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log();
    this.addressHidden = this.addressView.nativeElement.children.length === 0;

    this.cdRef.detectChanges();
  }
}
