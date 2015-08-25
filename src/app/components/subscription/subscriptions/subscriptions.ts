/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup, NgFor} from 'angular2/angular2';
import {SubscriptionService} from 'app/services/SubscriptionService'
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Subscription} from '../subscription/subscription';

let template = require('./subscriptions.html');

@Component({
  selector: 'subscriptions',
})
@View({
  directives: [angularDirectives, appDirectives, NgFor, Subscription],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template
})
export class Subscriptions {
  subscriptions:Array<Object>;

  constructor(public subscriptionService:SubscriptionService) {
    this.subscriptionService.subscriptions
      .subscribe((subscriptions) => {
        this.subscriptions = subscriptions;
      })
  }
}
