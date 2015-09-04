/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {SubscriptionService, Subscription} from 'app/services/SubscriptionService'
import {UserService} from 'app/services/UserService';

let template = require('./subscription.html');
let style = require('./subscription.css');

@Component({
  selector: '[subscription-component]',
  properties: ['subscription']
})
@View({
  directives: [angularDirectives, appDirectives],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class SubscriptionComponent {
  subscription:Subscription;

  constructor(public subscriptionService:SubscriptionService, public userService: UserService) {
  }

  save() {
    this.subscriptionService.save(this.subscription);
  }

  remove() {
    if (confirm(`Удалить подписку на ${this.subscription.dataId}?`)) {
      this.subscriptionService.remove(this.subscription)
        .subscribe(() => {
          this.subscriptionService.updateSubscriptions();
        })
    }
  }
  editingWithPayedPlan(){
    return this.subscription.edit && this.userService.hasPayedPlan()
  }
}
