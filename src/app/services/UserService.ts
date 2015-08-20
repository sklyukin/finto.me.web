/// <reference path="../../typings/_custom.d.ts" />

import {bind, Injectable, Http} from 'angular2/angular2';
import {ApiService} from './ApiService';
//

@Injectable()
export class UserService {
  jwtData:Object;
  currentUser:Object;

  constructor(public http:Http, public api:ApiService) {
  }

  login(email, password) {
    return this.api.request('post', 'users/login', {email, password})
      .subscribe((jwtData) => {
        this._setJwtData(jwtData);
        this.requestUser();
      });
  }

  requestUser() {
    let userId = this.jwtData.userId;
    return this.api.request('get', `users/${userId}`)
      .subscribe((user) => {
        console.log(`we have user`);
        console.log(user);
        this.currentUser = user;
      })
  }


  _setJwtData(jwtData) {
    this.jwtData = jwtData;
    localStorage.setItem('jwt', JSON.stringify(jwtData));
  }
}

// export our injectables for this module
export var userInjectables:Array<any> = [
  bind(UserService).toClass(UserService)
];
