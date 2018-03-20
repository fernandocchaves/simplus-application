(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('DataService', DataService);

		DataService.$inject = ['ApiService', '$q'];

	function DataService(ApiService, $q) {

		var svc = {};
		var self = this;

		svc.compositions = [];
	
		svc.getAll = getAll;
		svc.saveData = saveData;
		svc.delete = del;

		self.flatTree = flatTree;
		self.reduceFlatTree = reduceFlatTree;
		self.recursiveReduce = recursiveReduce;

		function getAll() {
			var defer = $q.defer();
			var compositions = [];

			ApiService.getCompositions().then(function(res){
				compositions = res.data.map(node => self.recursiveReduce(node, [], 0)).reduce(self.reduceFlatTree, []);
				angular.copy(compositions, svc.compositions);
				defer.resolve(svc.compositions);
			}, function(res) { 
				console.log(res);
				defer.reject(res);
			});

			return defer.promise;
		}

		function saveData(params) {
			var defer = $q.defer();

			ApiService.saveComposition(params).then(function(res){
				svc.getAll();
			}, function(res) { 
				console.log(res);
				defer.reject(res);
			});

			return defer.promise;
		}

		function del(id) {
			var defer = $q.defer();

			ApiService.delete(id).then(function(res){
				svc.getAll();
			}, function(res) { 
				console.log(res);
				defer.reject(res);
			});

			return defer.promise;
		}

		function recursiveReduce(node, already, level) {
			var composition = [];
			already.push(self.flatTree(node, composition, level));
			return already;
		}

		function flatTree(node, composition, level) {
			node.level = level;
			if (node.children) {
				composition.push(node);
				level++;
				return flatTree(node.children, composition, level);
			}
			
			composition.push(node);
			return composition;
		}

		function reduceFlatTree(prev, curr) {
			prev = prev.concat(curr);
			return prev;
		}

		return svc;
	}

})(window.angular);
