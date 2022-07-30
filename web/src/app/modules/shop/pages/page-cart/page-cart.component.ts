import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { FormControl, Validators } from '@angular/forms';
import { CartItem } from '../../../../shared/interfaces/cart-item';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RootService } from '../../../../shared/services/root.service';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { Article } from 'src/app/core/_models/Article';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { AuthorizationEntity } from 'src/app/core/authentication/authentication.models';
interface Item {
    cartItem: CartItem;
    quantity: number;
    quantityControl: FormControl;
}

@Component({
    selector: 'app-cart',
    templateUrl: './page-cart.component.html',
    styleUrls: ['./page-cart.component.scss']
})
export class PageCartComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    removedItems: CartItem[] = [];
    items: Item[] = [];
    updating = false;
    soldout=false;
    articles:Article[]=[]
    credential:AuthorizationEntity;
    constructor(
        public root: RootService,
        public cart: CartService,
        private product:ArticleService,
        private credentialsService: CredentialsService,
        private userService:UserService,
    ) { }

    ngOnInit(): void {
        if(this.credentialsService.isAuthenticated()){
            this.credential = this.credentialsService.credentials;
        }
        this.cart.items$.pipe(
            takeUntil(this.destroy$),
            map(cartItems => cartItems.map(cartItem => {
                return {
                    cartItem,
                    quantity: cartItem.quantity,
                    quantityControl: new FormControl(cartItem.quantity, Validators.required)
                };
            }))
        ).subscribe(items => {this.items = items;this.getProducts()
        
    });
    }

    download(){
        const div = document.getElementById('htmlData');
        const options = {
          background: 'white',
          scale: 3
        };
        html2canvas(div, options)
          .then((canvas: any) => {
            var img = canvas.toDataURL('image/PNG');
            var doc = new jsPDF('p', 'mm', 'a4', 1);
            doc.setFontSize(24);doc.text(20, 20, 'Devis');
            doc.setFontSize(13);
            doc.text(20, 30, 'Société:Tunisie Accastillage');
            doc.text(20, 40, 'Client:'+this.credential.fullName);
            this.cart.total$.subscribe(data=>{doc.text(20, 50, 'Total de la commande HT:'+data+" TND");})
            this.cart.totalTTC$.subscribe(data=>{doc.text(20, 60, 'Total de la commande TTC:'+data+" TND");})
            
            // Add image Canvas to PDF
            const bufferX = 5;
            const bufferY = 70;
            const imgProps = (<any>doc).getImageProperties(img);
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            doc.addImage(
              img,
              'PNG',
              bufferX,
              bufferY,
              pdfWidth,
              pdfHeight,
              undefined,
              'FAST'
            );
                
            return doc;
          })
          .then((doc: any) => {
            doc.save('Devis-' + new Date().getTime() + '.pdf');
          });
      }
    getProducts(){
        this.product.getAllArticles().subscribe(data=>{
            this.articles = data;
            this.items.forEach(item=>{
                if(this.isSoldOut(item.cartItem.product._id,item.cartItem.quantity)){
                    this.soldout=true;
                }
            })
        })
    }
    isSoldOut(id:string,quantity:number){
        let product = this.articles.find(item=>item._id===id)
        if(product){ return (product.quantity < quantity)}
        else return false;
       
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    remove(item: CartItem): void {
        if (this.removedItems.includes(item)) {
            return;
        }

        this.removedItems.push(item);
        this.cart.remove(item).subscribe({complete: () => this.removedItems = this.removedItems.filter(eachItem => eachItem !== item)});
    }

    update(): void {
        this.updating = true;
        this.cart.update(
            this.items
                .filter(item => item.quantityControl.value !== item.quantity)
                .map(item => ({
                    item: item.cartItem,
                    quantity: item.quantityControl.value
                }))
        ).subscribe({complete: () => this.updating = false});
    }

    needUpdate(): boolean {
        let needUpdate = false;

        for (const item of this.items) {
            if (!item.quantityControl.valid) {
                return false;
            }

            if (item.quantityControl.value !== item.quantity) {
                needUpdate = true;
            }
        }

        return needUpdate;
    }
}
