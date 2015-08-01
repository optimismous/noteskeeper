'use strict';

angular.module('notesKeeper.postsList', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/posts-list', {
            templateUrl: 'app/views/posts-list.html'
        })
    }]);