/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup} from 'angular2/angular2';
import {FormBuilder, Validators} from 'angular2/forms';
import {UserService} from 'app/services/UserService'

import {appDirectives, angularDirectives} from 'app/directives/directives';
import {commonComponents} from 'app/components/common/components';

let style = require('./registration.scss');
let template = require('./registration.html');

@Component({
  selector: 'registration',
})
@View({
  directives: [angularDirectives, appDirectives, commonComponents],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class Registration {
  registrationForm:ControlGroup;
  showErrors:Boolean = false;
  error:String;

  constructor(public userService:UserService) {
    let fb = new FormBuilder();

    this.registrationForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit(event) {
    this.showErrors = true;
    if (!this.registrationForm.errors) {
      let data = this.registrationForm.value;
      this.error = '';
      this.userService.createUser(data)
        .subscribe((response) => {
          if (!response.error) {
            this.userService.login(data.email, data.password);
          } else {
            this.error = response.error.message;
          }
        })
    }
    event.preventDefault();
  }
}
