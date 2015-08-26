/// <reference path="../../../../typings/_custom.d.ts" />

import {Component, View, ViewEncapsulation, ControlGroup, NgFor} from 'angular2/angular2';
import {SubscriptionService, Subscription} from 'app/services/SubscriptionService'
import {SecurityService, Security} from 'app/services/SecurityService'
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Router} from 'angular2/router';

let template = require('./subscription-add.html');
let style = require('./subscription-add.css');

@Component({
  selector: 'subscription-add',
})
@View({
  directives: [angularDirectives, appDirectives, NgFor],
  encapsulation: ViewEncapsulation.EMULATED,
  template: template,
  styles: [style]
})
export class SubscriptionAdd {
  securities:Array<Security>;
  securitiesUnfiltered:Array<Security>;

  constructor(public subscriptionService:SubscriptionService,
              public securityService:SecurityService,
              public router: Router
  ) {
    securityService.securities
      .subscribe((securities) => {
        this.securities = securities;
        this.securitiesUnfiltered = securities;
      });
  }

  search($event) {
    let filter = $event.target.value.toLowerCase();
    this.securities = this.securitiesUnfiltered.filter((security) => {
      return (security.dataId.toLowerCase().indexOf(filter) > -1) ||
        (security.title.toLowerCase().indexOf(filter) > -1);
    });
  }

  add(security) {
    let subscription = new Subscription();
    subscription.dataId = security.dataId;
    this.subscriptionService.save(subscription)
      .subscribe((subscription) => {
        this.subscriptionService.updateSubscriptions();
        this.router.navigate('/');
      });
  }
}
