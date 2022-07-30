import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NavPanelPosition = 'static' | 'sticky';

export type NavPanelVisibility = 'hidden' | 'shown';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private departmentsAreaValue: HTMLElement = null;
    private departmentsAreaSubject: BehaviorSubject<HTMLElement> = new BehaviorSubject<HTMLElement>(null);

    get departmentsArea(): HTMLElement {
        return this.departmentsAreaValue;
    }
    set departmentsArea(value: HTMLElement) {
        if (this.departmentsAreaValue !== value) {
            this.departmentsAreaValue = value;
            this.departmentsAreaSubject.next(value);
        }
    }

    departmentsArea$: Observable<HTMLElement> = this.departmentsAreaSubject.asObservable();


    private navPanelPositionValue: NavPanelPosition = 'static';
    private navPanelPositionSubject: BehaviorSubject<NavPanelPosition> = new BehaviorSubject<NavPanelPosition>(null);

    get navPanelPosition(): NavPanelPosition {
        return this.navPanelPositionValue;
    }
    set navPanelPosition(value: NavPanelPosition) {
        if (this.navPanelPositionValue !== value) {
            this.navPanelPositionValue = value;
            this.navPanelPositionSubject.next(value);
        }
    }

    navPanelPositionState$: Observable<NavPanelPosition> = this.navPanelPositionSubject.asObservable();


    private navPanelVisibilityValue: NavPanelVisibility = 'hidden';
    private navPanelVisibilitySubject: BehaviorSubject<NavPanelVisibility> = new BehaviorSubject<NavPanelVisibility>(null);

    get navPanelVisibility(): NavPanelVisibility {
        return this.navPanelVisibilityValue;
    }

    set navPanelVisibility(value: NavPanelVisibility) {
        if (this.navPanelVisibilityValue !== value) {
            this.navPanelVisibilityValue = value;
            this.navPanelVisibilitySubject.next(value);
        }
    }

    navPanelVisibility$: Observable<NavPanelVisibility> = this.navPanelVisibilitySubject.asObservable();
}
