(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('ListController', ListController);

	ListController.$inject = ['DataService', '$uibModal', '$scope'];

	function ListController(DataService, $modal, $scope) {
		var vm = this;

		vm.compositions = DataService.compositions;
		vm.showForm = showForm;
		vm.delete = del;

		DataService.getAll();

		function showForm(composition, child) {
			if(composition === undefined || composition == null) {
				composition = {};
			}

			if(child !== undefined) {
				if(child.code !== undefined) {
					composition.children = child;
				} else {
					composition.children = child;
				}
			}

            var modalInstance = $modal.open({
                templateUrl: 'views/content/form.html',
                controller: 'CompositionController',
				scope: $scope,
				size: 'lg',
                resolve: {
                    data: function () {
                        return composition;
                    }
                }
            });
		};

		function del(id) {
			DataService.delete(id);
		};
	
	}

})(window.angular);
