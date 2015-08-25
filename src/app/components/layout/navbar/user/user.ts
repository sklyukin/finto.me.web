/// <reference path="../../../../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View, ViewEncapsulation} from 'angular2/angular2';
import {UserService} from '../../../../services/UserService'

import {appDirectives, angularDirectives} from 'app/directives/directives';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./user.html');

@Component({
  selector: '.user-navbar',
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
})
export class UserNavbar {
  constructor(public user:UserService) {
  }
}
