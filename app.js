'use strict';

angular.module('notesKeeper', [
    'ngRoute',
    'notesKeeper.view1',
    'notesKeeper.view2'
])

.run(['$rootScope', 'notesStorage', function ($rootScope, notesStorage) {
    $rootScope.notes = notesStorage.getNotes();

    $rootScope.getKeyFromStamp = function (tStamp) {
        return '_' + tStamp.toString(16);
    };

    $rootScope.isNotesEmpty = function () {
        return angular.equals({}, $rootScope.notes);
    }
}])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);