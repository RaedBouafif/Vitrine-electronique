import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../shared/services/store.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { Settings } from 'src/app/core/_models/Settings';

@Component({
    selector: 'app-footer-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    settings:Settings= new Settings()
    constructor(private userService:UserService) { }
    ngOnInit(): void {
        this.userService.getSettings().subscribe(data=>{
            this.settings.description=data.description.slice(0,data.description.indexOf('.')+1)

        })
    }
}
