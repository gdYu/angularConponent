'use strict';

angular
  .module('angularConponentApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'restangular',
    'opui.form',
    'ogui.form',
    'conponent.service',
    'conponent.directive',
    'conponent.filter',
    'conponent.controller',
  ]);
angular.module('conponent.service',[]);
angular.module('conponent.directive',[]);
angular.module('conponent.filter',[]);
angular.module('conponent.controller',[]);