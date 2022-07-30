import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'src/app/core/_services/user/user.service';
import { SocialAuthService} from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    
    credential: any;
    isAuthentificated:boolean;

    form: FormGroup;

/*
  0 : no error
  1:signin mail or password invalid
  2:signin account not verified
  */
 message=0;
 error: string;
    constructor( private credentialsService: CredentialsService,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private authService: SocialAuthService,
        private router: Router) { this.createForm()}
        private createForm() {
            this.form = this.formBuilder.group({
              username: ['', Validators.required],
              password: ['', Validators.required],
              remember: false
            });
          }
    ngOnInit(): void {
        this.isAuthentificated = this.credentialsService.isAuthenticated();
        if(this.isAuthentificated){
            this.credential = this.credentialsService.credentials;
        }
            this.credentialsService.getLogged.subscribe(data=>{
                if(data){
                this.isAuthentificated=true;
                this.credentialsService.getCred.subscribe(res=>{this.credential=res})
            
        }
        else {
            this.isAuthentificated=false
        }
        })
        
       
    }
    logout() {
        this.authenticationService.logout().subscribe(() => {this.closeMenu.emit();this.redirect()});
      }
    
      redirect() {
        this.router.navigate(['/account/login']);
      }

           /**
   * Logs-in the user
   * @param form The form value: user + password
   */
  log({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.userService.getCutstomerByLoginAndPassword(value.username, value.password)
        .subscribe(
          res => {
            if (res) {
             if(res.mailVerified===false){
                 this.message=2
             }
             else {
                this.message=0;
                value.object = res;
                this.authenticationService
                  .login(value)
                  .subscribe(
                    credentials => {
                      this.router.navigate(['/']);
                    },
                    error => {
                      this.error = error;
                    }
                  );
             }
              
            } else {
              this.message=1
            }
          },
          error => {
            this.message=1
          }
        );
    } 
  }
    /* social */
    signWithSocial(social): void {
 
      let provider = (social==='FB')?FacebookLoginProvider.PROVIDER_ID:GoogleLoginProvider.PROVIDER_ID; 
      let type = (social==='FB')?"facebook":"google"; 
    
      this.authService.signIn(provider).then(user => {
        this.signinSocial(user)
      });
      
    }
    signinSocial(user:SocialUser){
     
      this.userService.getCutstomerByLoginAndPassword(user.email, user.id)
      .subscribe(
        res => {
          if (res) {
              this.message=0;
              let value = { username: res.login,password: res.password,remember: true, object: res}
              this.authenticationService
                .login(value)
                .subscribe(
                  credentials => {
                    this.router.navigate(['/']);
                  },
                  error => {
                    this.error = error;
                  }
                );
           
            
          } else {
            this.message=1
          }
        },
        error => {
          this.message=1
        }
      );
  } 
}
