'use strict';

angular.module('notesKeeper', [
    'ngRoute',
    'notesKeeper.view1',
    'notesKeeper.view2',
    'notesKeeper.menu'
])

.run(['$rootScope', 'notesStorage', function ($rootScope, notesStorage) {
    $rootScope.notesStorage = notesStorage;
}])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);