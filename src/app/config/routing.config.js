(function(angular) {
	"use strict";
	angular
		.module('app')
		.config(defineRoutes);

	defineRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function defineRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: true
			}).hashPrefix('!');

		$urlRouterProvider.otherwise('/');

		$stateProvider
			
			.state('content', {
				url:'/',
				anonymous: false,
				views: {
					'': {
						templateUrl: 'views/content/table.html',
						controller: 'ListController as listCtrl'
					}
				}
			})
	}
})(window.angular);