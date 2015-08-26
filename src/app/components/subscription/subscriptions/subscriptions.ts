/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup, NgFor} from 'angular2/angular2';
import {SubscriptionService} from 'app/services/SubscriptionService'
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {SubscriptionComponent} from '../subscription/subscription';

let template = require('./subscriptions.html');
let style = require('./subscriptions.css');

@Component({
  selector: 'subscriptions',
})
@View({
  directives: [angularDirectives, appDirectives, NgFor, SubscriptionComponent],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
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
