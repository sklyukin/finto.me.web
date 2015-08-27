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
import {UserService} from 'app/services/UserService';

import {Login} from './user/login/login';
import {Home} from './home/home';
import {SubscriptionAdd} from './subscription/subscription-add/subscription-add';
import {UserNavbar} from './layout/navbar/user/user';


// Use webpack's `require` to get files as a raw string using raw-loader
let styles = require('./app.css');

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
    [UserNavbar]
  ],
  // include our .css file
  styles: [styles],
  template: `
    <header>
      <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand">Уведомления</a>
         <ul class="nav navbar-nav">
            <li class="nav-item active">
              <a [router-link]=" ['/home'] "class="nav-link">Главная</a>
            </li>
        </ul>
        <ul class="nav navbar-nav pull-right">
            <li class="nav-item" *ng-if="!userService.currentUser">
              <a [router-link]=" ['/login'] "class="nav-link">Войти</a>
            </li>
            <li class="user-navbar nav-item"></li>
            <li class="nav-item" *ng-if="userService.currentUser">
              <a href="#" class="nav-link" (click)="userService.logout()">Выйти</a>
            </li>
        </ul>
      </div>
      </nav>
    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="container">
      <!--Финансовые уведомления 2015-->
    </footer>
  `
})
@RouteConfig([
  {path: '/', as: 'home', component: Home},
  {path: '/login', as: 'login', component: Login},
  {path: '/subscription/add', as: 'subscription-add', component: SubscriptionAdd}
])
export class App {
  constructor(public userService: UserService) {
  }
}



