'use strict';

angular.module('notesKeeper.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'views/view2/view2.html'
        })
    }]);