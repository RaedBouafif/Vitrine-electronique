import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DirectionService } from '../../../shared/services/direction.service';
import { ImageService } from 'src/app/core/_services/image/image.service'
import { Image } from 'src/app/core/_models/Image'
import { BannerService } from 'src/app/core/_services/banner/banner.service';
import { Banner } from 'src/app/core/_models/Banner';
@Component({
    selector: 'app-block-slideshow',
    templateUrl: './block-slideshow.component.html',
    styleUrls: ['./block-slideshow.component.scss']
})
export class BlockSlideshowComponent implements OnInit {
    @Input() withDepartments = false;

    options = {
        nav: false,
        dots: true,
        loop: true,
        responsive: {
            0: {items: 1}
        },
        rtl: this.direction.isRTL()
    };

    slides = [
        {
            title: 'Big choice of<br>Plumbing products',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/slides/slide-1.jpg',
            image_full: 'assets/images/slides/slide-1-full.jpg',
            image_mobile: 'assets/images/slides/slide-1-mobile.jpg'
        },
        {
            title: 'Screwdrivers<br>Professional Tools',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/slides/slide-2.jpg',
            image_full: 'assets/images/slides/slide-2-full.jpg',
            image_mobile: 'assets/images/slides/slide-2-mobile.jpg'
        },
        {
            title: 'One more<br>Unique header',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/slides/slide-3.jpg',
            image_full: 'assets/images/slides/slide-3-full.jpg',
            image_mobile: 'assets/images/slides/slide-3-mobile.jpg'
        }
    ];
    images:Image[]=[]
    banners:Banner[]=[]
    constructor(
        public sanitizer: DomSanitizer,
        private direction: DirectionService,
        private imageService:ImageService,
        private bannerService:BannerService
    ) { }
    ngOnInit(): void {
        this.GetBanner()
    }
    getGalery(){
        this.imageService.getAllImages().subscribe(data=>{
            this.images = data.filter(item=>item.active===true)
        })
    }
    GetBanner(){
        this.bannerService.getAllBanners().subscribe(data=>{
            this.banners = data.filter(item=>item.active===true)
        })
    }
}
