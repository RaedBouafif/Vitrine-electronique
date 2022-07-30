import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { RootService } from '../../../shared/services/root.service';
import { Category, SubCategory } from 'src/app/core/_models/Category/Category';

@Component({
    selector: 'app-block-categories',
    templateUrl: './block-categories.component.html',
    styleUrls: ['./block-categories.component.scss']
})
export class BlockCategoriesComponent  {
    @Input() header = '';
    @Input() layout: 'classic'|'compact' = 'classic';
    @Input() categories: Category[] = [];

    constructor(
        public root: RootService,
    ) { }

   
    filter(data:SubCategory[]){
        return data.filter(item=>item.active===true).slice(0,5)
    }
   
}
