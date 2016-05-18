'use strict';
/**
 * 路由配置
 */

angular.module('angularConponentApp')
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/main/homePage'); //默认跳转路径

			$stateProvider.state('main', {
					url: '/main',
					views: {
						'main_view': {
							templateUrl: 'views/main.html',
							controller:'mainCtrl'
						}
					}
				})
				//主界面顶部和查询栏
				.state('main.homePage', {
					url: '/homePage',
					views: {
						'top_view': {
							templateUrl: 'views/homePage/menu.html'
						},
						'body_view': {
							templateUrl: 'views/homePage/bodyView.html'
						},
						'bottom_view': {
							templateUrl: 'views/homePage/bottom.html'
						}
					}
				})

				.state('main.checkForm', {
					url: '/angular/checkForm',
					views: {
						'top_view': {
							templateUrl: 'views/homePage/menu.html'
						},
						'body_view': {
							templateUrl: 'views/angularjs/checkForm.html',
							controller:'checkFormCtrl'
						},
						'bottom_view': {
							templateUrl: 'views/homePage/bottom.html'
						}
					}
				})
				.state('main.checkForm2', {
					url: '/angular/checkForm2',
					views: {
						'top_view': {
							templateUrl: 'views/homePage/menu.html'
						},
						'body_view': {
							templateUrl: 'views/angularjs/checkForm2.html',
							controller:'checkFormCtrl2'
						},
						'bottom_view': {
							templateUrl: 'views/homePage/bottom.html'
						}
					}
				});
		}
	]);