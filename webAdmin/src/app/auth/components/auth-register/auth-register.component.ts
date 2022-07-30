import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Logger, AuthenticationService } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';

import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs/operators';
import { BaseFormComponent } from '@app/core/base/base-form-component';

const logger = new Logger('Register');

@Component({
  selector: 'prx-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent extends BaseFormComponent implements OnInit {
  longArrowAltRight = faLongArrowAltRight;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {}

  register() {
    this.isLoading = true;
    this.authenticationService
      .register(this.form.value)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          logger.debug(`${credentials.username} successfully registered`);
          this.route.queryParams.subscribe(
            params => logger.debug(`redirecting to the confirmation page`)
            // redirect here or de whatever you need to do with after registration
          );
        },
        error => {
          logger.debug(`Register error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
}
