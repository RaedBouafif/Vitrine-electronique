import { Component, ElementRef, HostBinding, Inject, Input, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselComponent, SlidesOutputData } from 'ngx-owl-carousel-o';
import { OwlCarouselOConfig } from 'ngx-owl-carousel-o/lib/carousel/owl-carousel-o-config';
import { PhotoSwipeItem, PhotoSwipeService, PhotoSwipeThumbBounds } from '../../services/photo-swipe.service';
import { DirectionService } from '../../services/direction.service';
import { isPlatformBrowser } from '@angular/common';
import { ProductLayout } from '../product/product.component';
import { Media } from 'src/app/core/_models/Article';



@Component({
    selector: 'app-product-gallery',
    templateUrl: './product-gallery.component.html',
    styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {
    items: Media[] = [];

    currentItem: Media = null;
    currentItemid:number=0;

    carouselOptions: Partial<OwlCarouselOConfig> = {
        dots: false,
        autoplay: false,
        responsive: {
            0: {items: 1}
        },
        rtl: this.direction.isRTL()
    };

    thumbnailsCarouselOptions: Partial<OwlCarouselOConfig> = {
        dots: false,
        autoplay: false,
        margin: 10,
        items: 5,
        responsive: {
            480: {items: 5},
            380: {items: 4},
            0: {items: 3}
        },
        rtl: this.direction.isRTL()
    };

    @Input() productLayout: ProductLayout;

    @Input() set images(images: Media[]) {
        this.items = images
        this.currentItem = this.items[0] || null;
    }

    @HostBinding('class.product-gallery') classProductGallery = true;

    @ViewChild('featuredCarousel', { read: CarouselComponent }) featuredCarousel: CarouselComponent;

    @ViewChild('thumbnailsCarousel', { read: CarouselComponent }) thumbnailsCarousel: CarouselComponent;

    @ViewChildren('imageElement', {read: ElementRef}) imageElements: QueryList<ElementRef>;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private photoSwipe: PhotoSwipeService,
        private direction: DirectionService
    ) { }

    ngOnInit(): void {
        if (this.productLayout !== 'quickview' && isPlatformBrowser(this.platformId)) {
            this.photoSwipe.load().subscribe();
        }
    }

    featuredCarouselTranslated(event: SlidesOutputData): void {
        if (event.slides.length) {
            const activeImageId = event.slides[0].id;

            this.currentItem = this.items.find(x => x._id === activeImageId) || this.items[0] || null;

            if (!this.thumbnailsCarousel.slidesData.find(slide => slide.id === activeImageId && slide.isActive)) {
                this.thumbnailsCarousel.to(activeImageId);
            }
        }
    }

    getDirDependentIndex(index) {
        // we need to invert index id direction === 'rtl' because photoswipe do not support rtl
        if (this.direction.isRTL()) {
            return this.items.length - 1 - index;
        }

        return index;
    }

    onFeaturedImageClick(event: MouseEvent, image: any): void {
        if (this.productLayout !== 'quickview') {
            event.preventDefault();

            this.openPhotoSwipe(image);
        }
    }

    onThumbnailImageClick(item: Media,i:number): void {
        this.currentItemid=i;
        this.featuredCarousel.to(i.toString());
        this.currentItem = item;
    }

    openPhotoSwipe(item: Media): void {
        if (!item) {
            return;
        }

        const imageElements = this.imageElements.map(x => x.nativeElement);
        const images: PhotoSwipeItem[] = this.items.map((eachItem, i) => {
            const tag: HTMLImageElement = imageElements[i];
            const width = parseFloat(tag.dataset.width) || tag.naturalWidth;
            const height = parseFloat(tag.dataset.height) || tag.naturalHeight;

            return {
                src: eachItem.path,
                msrc: eachItem.path,
                w: width,
                h: height,
            };
        });

        if (this.direction.isRTL()) {
            images.reverse();
        }

        // noinspection JSUnusedGlobalSymbols
        const options = {
            getThumbBoundsFn: index => this.getThumbBounds(index),
            index: this.getDirDependentIndex(this.items.indexOf(item)),
            bgOpacity: .9,
            history: false,
        };

        this.photoSwipe.open(images, options).subscribe(galleryRef => {
            galleryRef.listen('beforeChange', () => {
                this.featuredCarousel.to(this.items[this.getDirDependentIndex(galleryRef.getCurrentIndex())]._id);
            });
        });
    }

    getThumbBounds(index: number): PhotoSwipeThumbBounds {
        const imageElements = this.imageElements.toArray();
        const dirDependentIndex = this.getDirDependentIndex(index);

        if (!imageElements[dirDependentIndex]) {
            return null;
        }

        const tag = imageElements[dirDependentIndex].nativeElement;
        const width = tag.naturalWidth;
        const height = tag.naturalHeight;
        const rect = tag.getBoundingClientRect();
        const ration = Math.min(rect.width / width, rect.height / height);
        const fitWidth = width * ration;
        const fitHeight = height * ration;

        return {
            x: rect.left + (rect.width - fitWidth) / 2 + window.pageXOffset,
            y: rect.top + (rect.height - fitHeight) / 2 + window.pageYOffset,
            w: fitWidth,
        };
    }
}
