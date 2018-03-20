(function(angular) {
	"use strict";

	angular
		.module('app')
		.service('ApiService', ApiService);

	ApiService.$inject = ['API', 'HTTPService'];

	function ApiService (API, HTTPService) {

		var self = this;
		self.getCompositions = getCompositions;
		self.saveComposition = saveComposition;
		self.delete = del;

		function getCompositions() {
			return HTTPService.get(API.compositions);
		}

		function saveComposition(params) {
			if(params.id !== undefined) {
				return HTTPService.put(API.compositions, params);
			} else {
				return HTTPService.post(API.compositions, params);
			}
		}

		function del(id) {
			return HTTPService.delete(API.compositions + id);
		}
	}

})(window.angular);
