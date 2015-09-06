/// <reference path="../../../../typings/_custom.d.ts" />
import {Component, View, ViewEncapsulation} from 'angular2/angular2';

import {appDirectives, angularDirectives} from 'app/directives/directives';

let template = require('./contacts.html');
let style = require('./contacts.scss');

@Component({
  selector: 'contacts'
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class Contacts{
}
