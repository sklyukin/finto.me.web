/// <reference path="../../../../typings/_custom.d.ts" />
import {Component, View, ViewEncapsulation} from 'angular2/angular2';

import {appDirectives, angularDirectives} from 'app/directives/directives';
import {UserService} from 'app/services/UserService';
import {UserNavbar} from './user/user';

let template = require('./navbar.html');
let style = require('./navbar.scss');

@Component({
  selector: 'navbar'
})
@View({
  directives: [ angularDirectives, appDirectives, UserNavbar],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class Navbar {
  constructor(public userService: UserService) {

  }
}
