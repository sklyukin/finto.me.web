/// <reference path="../../typings/_custom.d.ts" />

import {bind, Injectable, Http} from 'angular2/angular2';
import {ApiService} from './ApiService';
import {Router} from 'angular2/router';
import * as Rx from 'rx';

class JwtData {
  id:String;
  userId:String
}

export class User {
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
    this.currentUserObservable = new Rx.BehaviorSubject<User>();

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
    let query = this.api.request('post', 'users/login', {email, password});

    query.subscribe((jwtData) => {
      if (jwtData && !jwtData.error) {
        this._setJwtData(jwtData);
        this.requestUser().subscribe(() => {
          this.router.navigate('/');
        })
      }
    });
    return query;
  }

  logout() {
    this._setJwtData(null);
    this.currentUserObservable.onNext(null);
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
    if (jwtData) {
      localStorage.setItem('jwt', JSON.stringify(jwtData));
    } else {
      localStorage.removeItem('jwt');
    }
  }
}

// export our injectables for this module
export var userInjectables:Array<any> = [
  bind(UserService).toClass(UserService)
];
