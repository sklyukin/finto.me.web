/// <reference path="../../typings/_custom.d.ts" />

import {bind, Http, Injectable} from 'angular2/angular2';

import {Config} from 'app/config/Config';
export const API_SERVER_URL = `http://${Config.api.host}:${Config.api.port}`;

const API_BASE_URL = `${API_SERVER_URL}/api/`;

@Injectable()
export class ApiService {
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
    let finalUrl = `${API_BASE_URL}${url}`;
    let query;
    switch (method) {
      case 'get':
        query = this.http.get(finalUrl, options);
        break;
      default:
        query = this.http[method](finalUrl, JSON.stringify(data), options);
        break;
    }
    return query.toRx().map(result => {
      let text = result.text();
      //e.g. empty result can be returned for "delete"
      if (text === '') {
        return {};
      }
      return result.json()
    }).map(result => {
      //localizing errors
      if (result.error && result.error.details) {
        let firstError = '';
        let details = result.error.details;
        for (let field in details.codes) {
          let errors = details.codes[field];
          for (let key in errors) {
            let error = errors[key];
            let message = ApiService.validationMessage(error, field, result.error.details.context);
            details.messages[field][key] = message;
            firstError = firstError ? firstError : message;
          }
        }
        result.error.message = firstError ? firstError : result.error.message;
      }
      return result;
    });
  }

  static validationMessage(error, field, context) {
    switch (context) {
      case 'user':
        switch (field) {
          case 'email':
            return 'Пользователь с таким email уже зарегистрирован.';
            break;
        }
        break;
    }

    //default
    switch (error) {
      case 'uniqueness':
        return `Значение '${field}' должно быть уникально.`
    }
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
