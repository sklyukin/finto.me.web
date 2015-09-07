/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup} from 'angular2/angular2';
import {FormBuilder, Validators} from 'angular2/forms';
import {UserService} from 'app/services/UserService'

import {appDirectives, angularDirectives} from 'app/directives/directives';

let style = require('./login.scss');
let template = require('./login.html');

@Component({
  selector: 'login',
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class Login {
  loginForm:ControlGroup;
  error:String;

  constructor(fb:FormBuilder, public userService:UserService) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(event, form) {
    if (form.email && form.password) {
      event.preventDefault();
      this.userService.login(form.email, form.password)
        .subscribe((jwtData) => {
          this.error = jwtData.error;
        })
    }
  }
}
