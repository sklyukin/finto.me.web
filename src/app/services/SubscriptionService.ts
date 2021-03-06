/// <reference path="../../typings/_custom.d.ts" />

import {bind, Injectable, Http} from 'angular2/angular2';
import {ApiService} from './ApiService';
import {UserService} from './UserService';
import {Router} from 'angular2/router';
import * as Rx from 'rx';

export class Subscription {
  id:String;
  dataId:String;
  options:{
    percentChange: Number
  }
}

@Injectable()
export class SubscriptionService {
  subscriptions:Rx.Subject<Array<Subscription>>;

  constructor(public api:ApiService, public userService:UserService) {
    this.subscriptions = new Rx.BehaviorSubject<Array<Subscription>>();
    this.userService.currentUserObservable.subscribe((user) => {
      this.updateSubscriptions();
    });
  }

  updateSubscriptions() {
    let user = this.userService.currentUser;
    if (!user){
      return this.subscriptions.onNext([]);
    }
    this.api.request('get', `users/${user.id}/subscriptions`)
      .subscribe((subscriptions) => {
        this.subscriptions.onNext(subscriptions);
      })
  }

  save(subscription:Subscription) {
    return this.api.request('put', `Subscriptions`, subscription);
  }
  remove(subscription:Subscription) {
    return this.api.request('delete', `Subscriptions/${subscription.id}`);
  }
}

// export our injectables for this module
export var subscriptionInjectables:Array<any> = [
  bind(SubscriptionService).toClass(SubscriptionService)
];
