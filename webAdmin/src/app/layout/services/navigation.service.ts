import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  faTable,
  faEdit,
  faChartLine,
  faCalendarAlt,
  faPuzzlePiece,
  faTh,
  faReceipt,
  faLayerGroup,
  faInbox,
  faCircle,
  faUserShield,
  faCog,
  faFileAlt,
  faKey,
  faUserPlus,
  faUserSecret,
  faUsers,
  faMagic,
  faHome,
  faStore,
  faSuitcase,
  faCheckSquare,
  faLifeRing,
  faAd,
  faBold,
  faUserTie,
  faImages,
  faShoppingCart,
  faBoxes
} from '@fortawesome/free-solid-svg-icons';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';

import { NavigationOptions } from '../models/navigation';
import { faImage } from '@fortawesome/free-regular-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() {}

  getNavigationItems(): Observable<NavigationOptions[]> {
    return of([
      {
        title: 'Main',
        icon: { name: faLayerGroup },
        items: [
          {
            icon: { name: faHome },
            title: 'Home',
            link: '/home'
          },
          {
            icon: { name: faShoppingCart },
            title: 'Commandes',
            link: '/orders'
          }
        ]
      },
      {
        title: 'Articles',
        icon: { name: faLayerGroup },
        items: [
          {
            icon: { name: faStore },
            title: 'Articles',
            link: '/article'
          },
          {
            icon: { name: faBoxes },
            title: 'Catégories articles',
            link: '/article/category'
          }
        ]
      },
      {
        title: 'Contactes',
        icon: { name: faLayerGroup },
        items: [
          {
            icon: { name: faUsers },
            title: 'Clients',
            link: '/contacts/customer'
          },
          {
            icon: { name: faUserTie },
            title: 'Fournisseurs',
            link: '/contacts/provider'
          }
        ]
      },
      {
        title: 'Divers',
        icon: { name: faLayerGroup },
        items: [
          {
            icon: { name: faAd },
            title: 'Annonces',
            items: [
              {
                title: 'Annonces',
                link: '/others/ad',
                icon: { letter: 'A' }
              },
              {
                title: 'Catégories annonces ',
                link: '/others/ad/categories',
                icon: { letter: 'C' }
              }
            ]
          },
          {
            icon: { name: faBold },
            title: 'Bannière',
            link: '/others/banner'
          },
          {
            icon: { name: faImages },
            title: 'Galerie',
            link: '/others/gallery'
          }
        ]
      }
    ]);
  }
}
