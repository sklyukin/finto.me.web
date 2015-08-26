/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup, NgIf} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {SubscriptionService, Subscription} from 'app/services/SubscriptionService'

let template = require('./subscription.html');
let style = require('./subscription.css');

@Component({
  selector: '[subscription-component]',
  properties: ['subscription']
})
@View({
  directives: [angularDirectives, appDirectives, NgIf],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class SubscriptionComponent {
  subscription:Subscription;

  constructor(public subscriptionService:SubscriptionService) {
  }

  save() {
    this.subscriptionService.save(this.subscription);
  }

  remove() {
    if (confirm(`Удалить подписку на ${this.subscription.dataId}?`)) {
      this.subscriptionService.remove(this.subscription)
        .subscribe(() => {
          console.log('removed');
          this.subscriptionService.updateSubscriptions();
        })
    }
  }
}
