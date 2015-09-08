/// <reference path="../../../../../typings/_custom.d.ts" />

import {Component, Directive, View, ViewEncapsulation, ControlGroup} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

let template = require('./error.html');
let style = require('./error.scss');

@Component({
  selector: 'error',
  properties: ['model']
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class FormError {
  model: any;
}
