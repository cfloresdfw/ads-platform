'use strict';

angular.module('adToolApp.auth', [
  'adToolApp.constants',
  'adToolApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
