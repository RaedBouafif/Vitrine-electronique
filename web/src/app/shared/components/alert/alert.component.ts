import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    @Input() size: 'lg' = null;
    @Input() dismissible = false;
    @Input() type: 'info'|'primary'|'secondary'|'success'|'danger'|'warning' = 'info';

    @Output() close: EventEmitter<void> = new EventEmitter();

    @HostBinding('class.alert') classAlert = true;
    @HostBinding('class.alert-lg') get classAlertLg() { return this.size === 'lg'; }
    @HostBinding('class.alert-dismissible') get classAlertDismissible() { return this.dismissible; }
    @HostBinding('class.alert-info') get classAlertInfo() { return this.type === 'info'; }
    @HostBinding('class.alert-primary') get classAlertPrimary() { return this.type === 'primary'; }
    @HostBinding('class.alert-secondary') get classAlertSecondary() { return this.type === 'secondary'; }
    @HostBinding('class.alert-success') get classAlertSuccess() { return this.type === 'success'; }
    @HostBinding('class.alert-danger') get classAlertDanger() { return this.type === 'danger'; }
    @HostBinding('class.alert-warning') get classAlertWarning() { return this.type === 'warning'; }

    constructor() { }

    onClose() {
        this.close.emit();
    }
}
