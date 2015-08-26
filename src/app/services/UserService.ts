/// <reference path="../../typings/_custom.d.ts" />

import {bind, Injectable, Http} from 'angular2/angular2';
import {ApiService} from './ApiService';
import {Router} from 'angular2/router';
import * as Rx from 'rx';

class JwtData {
  id:String;
  userId:String
}

class User {
  id:String;
  firstName:String;
  lastName:String
}

@Injectable()
export class UserService {
  jwtData:JwtData;
  currentUser:User;
  currentUserObservable:Rx.Subject<User>;

  constructor(public http:Http, public api:ApiService, public router:Router) {
    this.currentUserObservable = new Rx.Subject<User>();

    this.parseJwtCache();

    this.currentUserObservable.subscribe((user) => {
      this.currentUser = user;
    });
  }

  parseJwtCache() {
    let str = localStorage.getItem('jwt');
    if (str) {
      try {
        let jwt = JSON.parse(str);
        if (jwt.userId) {
          this.jwtData = jwt;
        }
      }
      finally {

      }
    }
    if (this.jwtData) {
      this.requestUser();
    }
  }

  login(email, password) {
    return this.api.request('post', 'users/login', {email, password})
      .subscribe((jwtData) => {
        this._setJwtData(jwtData);
        this.requestUser().subscribe(() => {
          this.router.navigate('/');
        })
      });
  }

  requestUser() {
    let userId = this.jwtData.userId;
    let observer = this.api.request('get', `users/${userId}`);
    observer.subscribe((user) => {
      this.currentUserObservable.onNext(user);
    });

    return observer;
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
