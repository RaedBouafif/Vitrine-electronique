import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StepModel } from '../../models/step';
import { SkipService } from '../../services/skip.service';
import { RedirectService } from '@app/core/services/redirect.service';

const RedirectURL = '/starter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  steps: StepModel[] = [
    {
      title: 'Dashboard',
      description: 'Ready-made dashboard with most common components',
      image: 'dashboard.svg'
    },
    {
      title: 'Invoices',
      description: 'Invoices templates ready to be used',
      image: 'invoices.svg'
    },
    {
      title: 'Security',
      description: 'Already integrated security',
      image: 'security.svg'
    },
    {
      title: 'Productivity',
      description: 'Stop reinventing the wheel',
      image: 'productivity.svg'
    },
    {
      title: 'Quick and Easy',
      description:
        "You can trust what you're buying will speed up your development time by 200%",
      image: 'reliable.svg'
    }
  ];

  showOnStartup: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private skipService: SkipService,
    private _redirect: RedirectService
  ) {
    // Skipping the home in case the user has selected to skip it always
    if (!this.skipService.ShowAlways) {
      this.router.navigate([RedirectURL], { replaceUrl: true });
    }
  }

  ngOnInit() {}

  Skip() {
    this.skipService
      .SkipHome(this.showOnStartup)
      .subscribe(strategy =>
        this.route.queryParams.subscribe(params => this.redirect(params))
      );
  }

  redirect(params: Params) {
    if (params.redirect) {
      this._redirect.to(params.redirect, { replaceUrl: true });
    } else {
      this._redirect.to(RedirectURL);
    }
  }
}
