/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {coreDirectives, formDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

import {Login} from './user/login/login';
import {Registration} from './user/registration/registration';
import {Home} from './home/home';
import {SubscriptionAdd} from './subscription/subscription-add/subscription-add';
import {Navbar} from './layout/navbar/navbar';
import {Footer} from './layout/footer/footer';
import {Prices} from './info/prices/prices';
import {Contacts} from './info/contacts/contacts';


// Use webpack's `require` to get files as a raw string using raw-loader
let styles = require('./app.scss');

/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [
    // Angular's core directives
    coreDirectives,

    // Angular's form directives
    formDirectives,

    // Angular's router
    routerDirectives,

    // Our collection of directives from /directives
    appDirectives,
    [Navbar, Footer]
  ],
  // include our .css file
  styles: [styles],
  template: `
    <div class="full-page-height-container">
        <header>
          <navbar></navbar>
        </header>
        <main>
          <router-outlet></router-outlet>
        </main>
    </div>
    <footer>
    </footer>
  `
})
@RouteConfig([
  {path: '/', as: 'home', component: Home},
  {path: '/login', as: 'login', component: Login},
  {path: '/registration', as: 'registration', component: Registration},
  {path: '/prices', as: 'prices', component: Prices},
  {path: '/subscription/add', as: 'subscription-add', component: SubscriptionAdd},
  {path: '/contacts', as: 'contacts', component: Contacts}
])
export class App {
  constructor() {
  }
}



