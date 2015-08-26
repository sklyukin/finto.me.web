/// <reference path="../../typings/_custom.d.ts" />

import {bind, Http, Injectable} from 'angular2/angular2';

const BASE_URL = 'http://localhost:3000/api/';
@Injectable()
export class ApiService {
  //userService: UserService;
  constructor(public http:Http) {

  }

  request(method, url, data = {}) {
    let token = ApiService.getJwtToken();
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      }
    };
    let finalUrl = `${BASE_URL}${url}`;
    let query;
    switch (method) {
      case 'get':
        query = this.http.get(finalUrl, options);
        break;
      default:
        query = this.http[method](finalUrl, JSON.stringify(data), options);
        break;
    }
    return query.toRx().map( result => {
      let text = result.text();
      //e.g. empty result can be returned for "delete"
      if (text === ''){
        return {};
      }
      return result.json()
    });
  }


  //should be via UserService in future, cannot make it works on angular alpha
  static getJwtToken() {
    let data = localStorage.getItem('jwt');
    if (data) {
      try {
        data = JSON.parse(data);
        return data.id;
      }
      finally {

      }
    }
    return null;
  }
}

// export our injectables for this module
export var apiInjectables:Array<any> = [
  bind(ApiService).toClass(ApiService)
];
