import { Component, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';

@Component({
    selector: 'app-header-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    isAuthentificated:boolean;
    constructor( private credentialsService: CredentialsService) { }
    ngOnInit(): void {
        this.isAuthentificated = this.credentialsService.isAuthenticated();
        this.credentialsService.getLogged.subscribe(data=>{
            if(data){
            this.isAuthentificated=true;}
           else {
            this.isAuthentificated=false; }
    })
    }

    
}
