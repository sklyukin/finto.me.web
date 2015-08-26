/// <reference path="../../typings/_custom.d.ts" />

import {bind} from 'angular2/angular2';

import {apiInjectables} from './ApiService';
import {userInjectables} from './UserService';
import {subscriptionInjectables} from './SubscriptionService';

// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  apiInjectables,
  userInjectables,
  subscriptionInjectables
];
