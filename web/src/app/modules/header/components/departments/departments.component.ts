import {
    AfterViewChecked, AfterViewInit,
    Component,
    ElementRef,
    Inject, NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID, QueryList,
    Renderer2, ViewChild, ViewChildren
} from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationLink } from '../../../../shared/interfaces/navigation-link';
import { isPlatformBrowser } from '@angular/common';
import { HeaderService } from '../../../../shared/services/header.service';
import { fromMatchMedia } from '../../../../shared/functions/rxjs/fromMatchMedia';
import { fromOutsideTouchClick } from '../../../../shared/functions/rxjs/fromOutsideTouchClick';
import { CategoryService } from 'src/app/core/_services/category/category.service';
import { Category } from 'src/app/core/_models/Category/Category';

@Component({
    selector: 'app-header-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    private destroy$: Subject<any> = new Subject();

    @ViewChild('bodyElement') bodyElementRef: ElementRef;
    @ViewChild('containerElement') containerElementRef: ElementRef;
    @ViewChildren('submenuElement') submenuElements: QueryList<ElementRef>;
    @ViewChildren('itemElement') itemElements: QueryList<ElementRef>;

    items: NavigationLink[] = [];
    hoveredItem: NavigationLink = null;

    isOpen = false;
    fixed = false;

    reCalcSubmenuPosition = false;
     
    categories:Category[]=[]
    private get element(): HTMLElement {
        return this.el.nativeElement;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        private el: ElementRef,
        private header: HeaderService,
        private zone: NgZone,
        private categoryService:CategoryService
    ) { }
    getCategories(){
        this.categoryService.getAllCategorys().subscribe(data=>{
            this.categories=data;
            data.forEach(item=>{
                if(item.active){
                let menu :any = {type:'menu',items:[]};
                item.subCategories.forEach(element => {
                    if(element.active){menu.items.push({label:element.name,url:'/shop/catalog/'+item._id+'/'+element._id})}
                });
                if(menu.items.length!==0){
                    let obj :any = {label:item.categoryName,menu:menu,url:'/shop/catalog/'+item._id};
                this.items.push(obj)
                }
                
            }
            })
        })
    }
    ngOnInit(): void {
        const root = this.element.querySelector('.departments') as HTMLElement;
        const content = this.element.querySelector('.departments__links-wrapper') as HTMLElement;
        this.getCategories()
        merge(
            this.header.navPanelPositionState$,
            this.header.navPanelVisibility$,
        ).pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (this.header.navPanelPosition === 'static' && this.header.departmentsArea !== null) {
                this.open(true);
            } else if (this.isOpen) {
                this.close(true);
            }
        });

        this.header.departmentsArea$.pipe(takeUntil(this.destroy$)).subscribe(areaElement => {
            if (areaElement) {
                this.fixed = true;
                this.isOpen = true;

                if (isPlatformBrowser(this.platformId)) {
                    setTimeout(() => {
                        const areaRect = areaElement.getBoundingClientRect();
                        const areaBottom = areaRect.top + areaRect.height + window.scrollY;

                        root.classList.remove('departments--transition');
                        root.classList.add('departments--fixed', 'departments--open');

                        const height = areaBottom - (content.getBoundingClientRect().top + window.scrollY);

                        content.style.height = `${height}px`;
                        content.getBoundingClientRect(); // force reflow
                    }, 0);
                } else {
                    this.renderer.addClass(root, 'departments--fixed');
                    this.renderer.addClass(root, 'departments--open');
                }
            } else {
                this.fixed = false;
                this.isOpen = false;

                if (isPlatformBrowser(this.platformId)) {
                    root.classList.remove('departments--open', 'departments--fixed');
                    content.style.height = '';
                    content.style.transition = 'none';
                    content.getBoundingClientRect(); // force reflow
                    content.style.transition = '';
                } else {
                    this.renderer.removeClass(root, 'departments--fixed');
                    this.renderer.removeClass(root, 'departments--open');
                }
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            fromEvent<MouseEvent>(document, 'mousedown').pipe(
                takeUntil(this.destroy$)
            ).subscribe((event) => {
                if (event.target instanceof HTMLElement && !this.element.contains(event.target)) {
                    this.close();
                }
            });

            fromEvent<TransitionEvent>(content, 'transitionend').pipe(
                takeUntil(this.destroy$)
            ).subscribe((event) => {
                if (event.propertyName === 'height') {
                    root.classList.remove('departments--transition');
                }
            });

            fromMatchMedia('(min-width: 992px)').pipe(
                filter(x => x.matches && this.header.departmentsArea !== null),
                takeUntil(this.destroy$)
            ).subscribe(() => {
                const areaRect = this.header.departmentsArea.getBoundingClientRect();
                const areaBottom = areaRect.top + areaRect.height + window.scrollY;

                root.classList.remove('departments--transition');
                root.classList.add('departments--fixed', 'departments--open');

                const height = areaBottom - (content.getBoundingClientRect().top + window.scrollY);

                content.style.height = `${height}px`;
                content.getBoundingClientRect(); // force reflow
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                fromOutsideTouchClick(this.element).pipe(
                    takeUntil(this.destroy$)
                ).subscribe(() => {
                    if (this.isOpen) {
                        this.zone.run(() => this.close());
                    }
                });
            });
        }
    }

    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open(immediately = false): void {
        this.isOpen = true;

        const root = this.element.querySelector('.departments') as HTMLElement;
        const content = root.querySelector('.departments__links-wrapper') as HTMLElement;

        if (immediately) {
            root.classList.add('departments--open');

            const documentHeight = document.documentElement.clientHeight;
            const paddingBottom = 20;
            const contentRect = content.getBoundingClientRect();
            const endHeight = Math.min(contentRect.height, documentHeight - paddingBottom - contentRect.top);

            content.style.maxHeight = endHeight + 'px';
            content.style.height = endHeight + 'px';
            content.style.transition = 'none';

            content.getBoundingClientRect(); // force reflow

            content.style.transition = '';
        } else {
            const startHeight = content.getBoundingClientRect().height;

            root.classList.add('departments--transition', 'departments--open');

            const documentHeight = document.documentElement.clientHeight;
            const paddingBottom = 20;
            const contentRect = content.getBoundingClientRect();
            const endHeight = Math.min(contentRect.height, documentHeight - paddingBottom - contentRect.top);

            content.style.height = startHeight + 'px';
            content.getBoundingClientRect(); // force reflow
            content.style.maxHeight = endHeight + 'px';
            content.style.height = endHeight + 'px';
        }
    }

    close(immediately = false): void {
        if ((this.fixed && this.header.navPanelPosition === 'static') || !this.isOpen) {
            return;
        }

        this.isOpen = false;

        const root = this.element.querySelector('.departments') as HTMLElement;
        const content = root.querySelector('.departments__links-wrapper') as HTMLElement;

        if (immediately) {
            root.classList.remove('departments--open');

            content.style.transition = 'none';
            content.style.height = '';
            content.style.maxHeight = '';

            content.getBoundingClientRect(); // force reflow

            content.style.transition = '';
        } else {
            content.style.height = content.getBoundingClientRect().height + 'px';

            root.classList.add('departments--transition');
            root.classList.remove('departments--open');

            content.getBoundingClientRect(); // force reflow

            content.style.height = '';
            content.style.maxHeight = '';
        }

        this.hoveredItem = null;
    }

    onItemMouseEnter(item: NavigationLink): void {
        if (this.hoveredItem !== item) {
            this.hoveredItem = item;

            if (item.menu) {
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onMouseLeave(): void {
        this.hoveredItem = null;
    }

    onTouchClick(event, item: NavigationLink): void {
        if (event.cancelable) {
            if (this.hoveredItem && this.hoveredItem === item) {
                return;
            }

            if (item.menu) {
                event.preventDefault();

                this.hoveredItem = item;
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onItemClick(): void {
        this.close();
    }

    onSubItemClick(): void {
        this.close();
        this.hoveredItem = null;
    }

    ngAfterViewChecked(): void {
        if (!this.reCalcSubmenuPosition) {
            return;
        }

        this.reCalcSubmenuPosition = false;

        const itemElement = this.getCurrentItemElement();
        const submenuElement = this.getCurrentSubmenuElement();

        const viewportHeight = window.innerHeight;
        const paddingBottom = 20;

        if (this.hoveredItem.menu.type === 'megamenu') {
            const submenuTop = submenuElement.getBoundingClientRect().top;

            submenuElement.style.maxHeight = `${viewportHeight - submenuTop - paddingBottom}px`;
        }

        if (this.hoveredItem.menu.type === 'menu') {
            const bodyElement = this.bodyElementRef.nativeElement as HTMLDivElement;
            const containerElement = this.containerElementRef.nativeElement as HTMLDivElement;
            const bodyRect = bodyElement.getBoundingClientRect();

            const maxHeight = viewportHeight - paddingBottom - Math.min(
                paddingBottom,
                bodyRect.top
            );

            submenuElement.style.maxHeight = `${maxHeight}px`;

            const submenuRect = submenuElement.getBoundingClientRect();
            const itemRect = itemElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();
            const top = Math.min(itemRect.top, viewportHeight - paddingBottom - submenuRect.height) - containerRect.top;

            submenuElement.style.top = `${top}px`;
        }
    }

    getCurrentItemElement(): HTMLDivElement {
        if (!this.hoveredItem) {
            return null;
        }

        const index = this.items.indexOf(this.hoveredItem);
        const elements = this.itemElements.toArray();

        if (index === -1 || !elements[index]) {
            return null;
        }

        return elements[index].nativeElement as HTMLDivElement;
    }

    getCurrentSubmenuElement(): HTMLDivElement {
        if (!this.hoveredItem) {
            return null;
        }

        const index = this.items.filter(x => x.menu).indexOf(this.hoveredItem);
        const elements = this.submenuElements.toArray();

        if (index === -1 || !elements[index]) {
            return null;
        }

        return elements[index].nativeElement as HTMLDivElement;
    }
}
