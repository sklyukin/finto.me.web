/// <reference path="../../typings/_custom.d.ts" />

import {bind} from 'angular2/angular2';

import {todoInjectables} from './TodoService';
import {apiInjectables} from './ApiService';
import {userInjectables} from './UserService';
import {subscriptionInjectables} from './SubscriptionService';
import {githubInjectables} from '../components/rxjs-examples/autosuggest/Github';

// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  githubInjectables,
  todoInjectables,
  apiInjectables,
  userInjectables,
  subscriptionInjectables
];