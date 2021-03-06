/// <reference path="../../typings/_custom.d.ts" />

import {bind, Injectable, Http} from 'angular2/angular2';
import {ApiService, API_SERVER_URL} from './ApiService';
import {Router} from 'angular2/router';
import * as Rx from 'rx';

class JwtData {
  id:String;
  userId:String
}

export class User {
  id:String;
  firstName:String;
  lastName:String;
  payedTill: Date;
}

@Injectable()
export class UserService {
  FACEBOOK_AUTH_URL:String;
  GOOGLE_AUTH_URL:String;
  jwtData:JwtData;
  currentUser:User;
  currentUserObservable:Rx.Subject<User>;

  constructor(public http:Http, public api:ApiService, public router:Router) {
    this.currentUserObservable = new Rx.BehaviorSubject<User>();
    this.FACEBOOK_AUTH_URL = `${API_SERVER_URL}/auth/facebook`;
    this.GOOGLE_AUTH_URL = `${API_SERVER_URL}/auth/google`;

    //first let's try to get jwt for http, then from cache
    let params = getSearchParameters();
    if (params.jwt) {
      let jwtString = decodeURIComponent(params.jwt);
      this.validateJwtAndRequestUser(jwtString);
    }
    if (!this.jwtData) {
      this.parseJwtCache();
    }

    this.currentUserObservable.subscribe((user) => {
      this.currentUser = user;
    });
  }

  hasPayedPlan(){
   return this.currentUser && (this.currentUser.payedTill > new Date());
  }

  parseJwtCache():boolean {
    let jwtString = localStorage.getItem('jwt');
    return this.validateJwtAndRequestUser(jwtString);
  }

  validateJwtAndRequestUser(jwtString:String):boolean {
    let valid = false;
    if (jwtString) {
      try {
        let jwt = JSON.parse(jwtString);
        if (jwt.userId) {
          this._setJwtData(jwt);
          valid = true;
          this.setUserFromCache();
          this.requestUser();
        }
      }
      finally {
      }
    }
    return valid;
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

  createUser(data){
    return this.api.request('post', 'users', data);
  }

  logout() {
    this._setJwtData(null);
    this.currentUserObservable.onNext(null);
  }

  //can be called before requestUser to decrease app latency
  setUserFromCache(){
    let userJSON = localStorage.getItem('currentUser');
    if (userJSON){
      try{
        let user = JSON.parse(userJSON);
        this.currentUserObservable.onNext(user);
      }
      finally{

      }
    }
  }

  requestUser() {
    let userId = this.jwtData.userId;
    let observer = this.api.request('get', `users/${userId}`);
    observer.subscribe((user) => {
      user.payedTill = user.payedTill ? new Date(user.payedTill) : null;
      localStorage.setItem('currentUser', JSON.stringify(user));
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

var params = getSearchParameters();
// export our injectables for this module
export var userInjectables:Array<any> = [
  bind(UserService).toClass(UserService)
];

//can be a separate module
function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}
