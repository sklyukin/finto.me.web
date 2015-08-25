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

/*
 * App Pipes
 * our collection of pipes registry
 */
import {appPipes} from '../pipes/pipes';

/*
 * Components
 */
// We use a folder if we want separate files
import {Login} from './login/login';
import {Home} from './home/home';
import {UserNavbar} from './layout/navbar/user/user';

// Otherwise we only use one file for a component
// A simple example of a Component using a Service
import {Todo} from './todo';

// RxJs examples
import {RxJsExamples} from './rxjs-examples/rxjs-examples';

// Use webpack's `require` to get files as a raw string using raw-loader
let styles = require('./app.css');

/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
  viewBindings: [appPipes]
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
            <li class="nav-item">
              <a [router-link]=" ['/todo'] "class="nav-link">Todo</a>
            </li>
            <li class="nav-item">
              <a [router-link]=" ['/rxjs-examples', 'search'] "class="nav-link">RxJs Examples</a>
            </li>
        </ul>
        <ul class="nav navbar-nav pull-right">
            <li class="user-navbar nav-item"></li>
            <li class="nav-item">
              <a [router-link]=" ['/login'] "class="nav-link">Войти</a>
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
  {path: '/todo', as: 'todo', component: Todo},
  {path: '/rxjs-examples/...', as: 'rxjs-examples', component: RxJsExamples},
  {path: '/login', as: 'login', component: Login},
])
export class App {
  name:string;

  constructor() {
    this.name = 'angular'; // used in logo
  }
}
