'use strict';

angular.module('notesKeeper', [
    'ngRoute',
    'notesKeeper.addPost',
    'notesKeeper.postsList',
    'notesKeeper.singlePost',
    'notesKeeper.menu'
])

.run(['$rootScope', 'notesStorage', function ($rootScope, notesStorage) {
    $rootScope.notesStorage = notesStorage;
}])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/add-post'});
}]);