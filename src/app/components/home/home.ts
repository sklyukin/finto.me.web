/// <reference path="../../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View, ViewEncapsulation} from 'angular2/angular2';

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Subscriptions} from '../subscription/subscriptions/subscriptions';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./home.html');

// Simple external file component example
@Component({
  selector: 'home'
})
@View({
  directives: [ angularDirectives, appDirectives, Subscriptions],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template
})
export class Home {
  constructor() {

  }
}
