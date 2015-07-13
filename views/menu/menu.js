'use strict';

angular.module('notesKeeper.menu', [])

    .controller('menuCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) == path) {
                return "active";
            } else {
                return "";
            }
        }
    }]);