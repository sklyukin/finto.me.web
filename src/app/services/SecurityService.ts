/// <reference path="../../typings/_custom.d.ts" />

import {bind, Injectable, Http} from 'angular2/angular2';
import {ApiService} from './ApiService';
import {Router} from 'angular2/router';
import * as Rx from 'rx';

export class Security {
  dataId:String;
  title: String;
  updated:Date
}

@Injectable()
export class SecurityService {
  securities:Rx.Subject<Array<Security>>;

  constructor(public api:ApiService) {
    this.securities = new Rx.BehaviorSubject<Array<Security>>();
    let d = new Date();
    //only those which were active last times
    d.setDate(d.getDate() - 10);
    let params = {
      filter: {
        where: {
          updated: {gt: d.getTime()}
        },
        order: 'data.node.volume DESC',
        fields: {
          dataId: true,
          title: true,
          value: true,
          updated: true,
          node: true
        }
      }
    };

    let url = 'LastData?' + $.param(params);

    this.api.request('get', url)
      .subscribe((securities) => {
        this.securities.onNext(securities);
      })
  }
}

// export our injectables for this module
export var securityInjectables:Array<any> = [
  bind(SecurityService).toClass(SecurityService)
];
