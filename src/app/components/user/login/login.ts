/// <reference path="../../../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View, ViewEncapsulation, ControlGroup} from 'angular2/angular2';
import {FormBuilder, Validators} from 'angular2/forms';
import {UserService} from 'app/services/UserService'

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
import {appDirectives, angularDirectives} from 'app/directives/directives';

// Use webpack's `require` to get files as a raw string using raw-loader
//let styles = require('./login.css');
let template = require('./login.html');

// Simple external file component example
@Component({
  selector: 'login',
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  // include our .html and .css file
  //styles: [styles],
  template: template
})
export class Login {
  loginForm:ControlGroup;

  constructor(fb:FormBuilder, public user: UserService) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(event, form) {
    event.preventDefault();
    this.user.login(form.email, form.password);
  }
}
