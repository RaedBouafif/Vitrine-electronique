import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent extends BaseComponent implements OnInit {
  search = faSearch;

  constructor() {
    super('search-form');
  }

  ngOnInit() {}
}
