/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

let template = require('./subscription.html');

@Component({
  selector: '[subscription-component]',
  properties: ['subscription']
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template
})
export class Subscription {
  subscription:Object;

  constructor() {
  }
}
