/// <reference path="../../../../typings/_custom.d.ts" />
import {Component, View, ViewEncapsulation} from 'angular2/angular2';

import {appDirectives, angularDirectives} from 'app/directives/directives';

let template = require('./prices.html');
let style = require('./prices.scss');

@Component({
  selector: 'prices'
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class Prices{
  constructor() {

  }
}
