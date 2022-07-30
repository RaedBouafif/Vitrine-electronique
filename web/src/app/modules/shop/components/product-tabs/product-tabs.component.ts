import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core/_models/Article';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { Review } from 'src/app/core/_models/Review';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { Customer } from 'src/app/core/_models/user/Customer';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {
    @Input() withSidebar = false;
    @Input() product : Article ;
    @Input() tab: 'description'|'specification'|'reviews' = 'description';

    review:Review = new Review();
    reviews: Review[] = [];
    allreviews: Review[] = [];
    page=5;
    pages=0;
    customers:Customer[]=[]
    constructor(
        public credientialService:CredentialsService,
        private articleService:ArticleService,
        private userService:UserService
        ) {
     }
    ngOnInit(): void {
        if(this.credientialService.isAuthenticated()){
            this.review.customer=this.credientialService.credentials.accessToken;
            this.review.article=this.product._id;
            this.review.note=5;
        }
        this.getCustomers();
        this.getReviews()
    }
    getCustomers(){
        this.userService.getAllCustomers().subscribe(data=>{
            this.customers=data
        })
    }
    getCustomer(id:string){
        let value = this.customers.find(item=>item._id===id)
        return(value)?value.firstname:'inconnue';
        
    }
    getReviews(){
        this.articleService.getArticleReviews(this.product._id).subscribe(data=>{
            this.allreviews=data.reverse().filter(item=>item.active===true)
            this.pages=Math.ceil(data.length/this.page);
            this.reviews=this.allreviews.slice(0,this.page)
        })
    }
    display(event){
        this.reviews=this.allreviews.slice(this.page*event-1,this.page*event)
      }
    post(){
        this.articleService.addReview(this.review).subscribe(data=>{
           this.getReviews()
        })
    }
}
