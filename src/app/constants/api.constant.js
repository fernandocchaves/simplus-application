(function(angular) {
	'use strict';

	var API	= {};

	API.baseUrl = 'https://intense-mountain-53687.herokuapp.com/';

	API.compositions = resourceOf('');

	angular.module('app').constant('API', API);

	function resourceOf(resourceName) {
		return API.baseUrl + resourceName;
	}

})(angular);
