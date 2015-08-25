/// <reference path="../../typings/_custom.d.ts" />

import {bind, Injectable, Http} from 'angular2/angular2';
import {ApiService} from './ApiService';
import {UserService} from './UserService';
import {Router} from 'angular2/router';
import * as Rx from 'rx';

@Injectable()
export class SubscriptionService {
  subscriptions:Rx.Subject<Array<Object>>;

  constructor(public api:ApiService, public user:UserService) {
    this.subscriptions = new Rx.Subject<Array<Object>>();

    this.user.currentUserObservable.subscribe((user) => {
      this.api.request('get', `users/${user.id}/subscriptions`)
        .subscribe((subscriptions) => {
          this.subscriptions.onNext(subscriptions);
        })
    });
  }
}

// export our injectables for this module
export var subscriptionInjectables:Array<any> = [
  bind(SubscriptionService).toClass(SubscriptionService)
];
