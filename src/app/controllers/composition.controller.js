(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('CompositionController', CompositionController);

	CompositionController.$inject = ['DataService', '$scope', '$uibModalInstance', 'data'];

	function CompositionController(DataService, $scope, $modalInstance, data) {
        var vm = this;

        $scope.composition = data;
        $scope.submitForm = submitForm;
        $scope.cancel = cancel;

        function submitForm(form) {
            console.log($scope.composition);
			if ($scope.form.composition.$valid) {
				DataService.saveData($scope.composition);
				console.log('passou')
				DataService.getAll();
				$modalInstance.close('closed');
			} else {
				console.log('composition form is not in scope');
			}
		};
	
		function cancel() {
			console.log('Modal cancel');
			$modalInstance.dismiss('cancel');
		};
	
	}

})(window.angular);
