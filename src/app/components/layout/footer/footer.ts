/// <reference path="../../../../typings/_custom.d.ts" />
import {Component, View, ViewEncapsulation} from 'angular2/angular2';

import {appDirectives, angularDirectives} from 'app/directives/directives';

let template = require('./footer.html');
let style = require('./footer.scss');

@Component({
  selector: 'footer'
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class Footer{
  constructor() {

  }
}
