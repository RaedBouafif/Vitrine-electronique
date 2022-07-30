import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  forwardRef,
  QueryList,
  AfterContentInit,
  OnDestroy
} from '@angular/core';
import { BaseComponent } from '@app/core';
import { AccordionGroupComponent } from '../accordion-group/accordion-group.component';
import { takeUntil } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

@Component({
  selector: 'prx-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent extends BaseComponent
  implements OnInit, OnDestroy, AfterContentInit {
  protected destroy$ = new Subject<void>();

  /** turn on/off animation */
  @Input()
  isAnimated = false;

  /** if `true` expanding one item will close all others */
  @Input()
  closeOthers: boolean = true;

  @ContentChildren(forwardRef(() => AccordionGroupComponent))
  cards: QueryList<AccordionGroupComponent>;

  constructor() {
    super('accordion');
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit() {
    this.watchCardsForChanges();

    this.cards.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.watchCardsForChanges();
    });
  }

  protected watchCardsForChanges() {
    if (!this.cards || !this.cards.length) {
      return;
    }

    merge(...this.cards.map(card => card.isOpenChange))
      .pipe(takeUntil(merge(this.cards.changes, this.destroy$)))
      .subscribe((value: any) => {
        this.closeOtherPanels(value.target);
      });
  }

  closeOtherPanels(openGroup: AccordionGroupComponent): void {
    if (!this.closeOthers) {
      return;
    }

    this.cards.forEach((group: AccordionGroupComponent) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }
}
