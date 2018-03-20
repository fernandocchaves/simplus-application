(function(angular, undefined) {
    'use strict';

    angular
    .module('app')
    .factory('HTTPService', HTTPService);

    HTTPService.$inject = ['API', '$http', '$q'];

    function HTTPService(API, $http, $q) {

        return {
            get: get,
            post: post,
            put: put,
            delete: del
        }

        function http(url, params, method) {

            return $http({
                method: method,
                url: url,
                params: method == 'GET' ? params : null,
                data: method == 'POST' || method == 'PUT' ? params : null,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }

        function get(url, params) {
            return http(url, params, 'GET');
        }

        function post(url, params) {
            return http(url, params, 'POST');
        }

        function put(url, params) {
            return http(url, params, 'PUT');
        }

        function del(url, params) {
            return http(url, params, 'DELETE');
        }
    };

})(angular);
