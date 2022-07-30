import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/_services/user/user.service';
import { Settings } from 'src/app/core/_models/Settings';

@Component({
    selector: 'app-about-us',
    templateUrl: './page-about-us.component.html',
    styleUrls: ['./page-about-us.component.scss']
})
export class PageAboutUsComponent implements OnInit {
  
    settings:Settings=new Settings()
    constructor(
        private userService: UserService
    ) { }
    ngOnInit(): void {
        this.userService.getSettings().subscribe(data=>{
            this.settings=data
        })
    }
}
