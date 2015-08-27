/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {coreDirectives, formDirectives, NgIf, NgFor} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

/*
 * App
 */
import {Autofocus} from './Autofocus';

// global App only directives
export var appDirectives: Array<any> = [
  Autofocus
];

// global Angular core and other Angular module directives (form/router)
export var angularDirectives: Array<any> = [
  // Angular's core directives
  coreDirectives,

  // Angular's form directives
  formDirectives,

  NgIf, NgFor,

  // Angular's router
  routerDirectives
];
