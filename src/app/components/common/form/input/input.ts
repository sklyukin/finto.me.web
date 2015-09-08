/// <reference path="../../../../../typings/_custom.d.ts" />

import {Component, Directive, View, ViewEncapsulation, ControlGroup} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {FormError} from '../error/error';

let template = require('./input.html');
let style = require('./input.scss');

@Component({
  selector: 'formInput',
  properties: ['formControl','label', 'type', 'showErrors']
})
@View({
  directives: [angularDirectives, appDirectives, FormError],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class FormInput {
  formControl:any;
  showErrors:Boolean = false;
  type:String = 'text';
  label: String;

  constructor() {
  }
}
