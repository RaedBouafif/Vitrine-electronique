import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';
import { MobileMenuItem } from '../../../../shared/interfaces/mobile-menu-item';
import { CategoryService } from 'src/app/core/_services/category/category.service';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnDestroy, OnInit {
    private destroy$: Subject<any> = new Subject();

    isOpen = false;
    links: MobileMenuItem[] = [{type: 'link', label: 'Accueil', url: '/'},
    {type: 'link', label: 'Produits', url: '/shop/catalog',children: []},
    {type: 'link', label: 'Promotions', url: '/'},];;

    constructor(public mobilemenu: MobileMenuService,private categoryService:CategoryService) {this.getCategories() }

    ngOnInit(): void {
        this.mobilemenu.isOpen$.pipe(takeUntil(this.destroy$)).subscribe(isOpen => this.isOpen = isOpen);
       // this.getCategories()
    }
    getCategories(){
        this.categoryService.getAllCategorys().subscribe(data=>{
            data.forEach(item=>{
                if(item.active){
                let children :any = [];
                item.subCategories.forEach(element => {
                    if(element.active){children.push({type: 'link',label:element.name,url:'/shop/catalog/'+item._id+'/'+element._id})}
                });
                if(children.length!==0){
                    let obj :any = {type: 'link',label:item.categoryName,children:children,url:'/shop/catalog/'+item._id};
                this.links[1].children.push(obj)
              
                }
                
            }
            })
        })
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onItemClick(event: MobileMenuItem): void {
        if (event.type === 'link') {
            this.mobilemenu.close();
        }

        // if (event.data && event.data.language) {
        //     console.log(event.data.language); // change language
        // }
    }
}
