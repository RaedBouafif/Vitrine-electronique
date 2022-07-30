import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/core/_models/Settings';
import { UserService } from 'src/app/core/_services/user/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   links : any[] = []
    constructor(private userService:UserService) { }
    ngOnInit(): void {
        this.userService.getSettings().subscribe(data=>{
            data.links.filter(item=>item.active===true).forEach(item=>{
                let link = {label:item.name,url:item.link}
                this.links.push(link)
            })
        })
    }
}
