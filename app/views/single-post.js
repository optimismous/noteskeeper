'use strict';

angular.module('notesKeeper.singlePost', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/post/:id', {
            templateUrl: 'app/views/single-post.html'
        })
    }])

    .controller('SinglePostCtrl', ['$rootScope', '$scope', '$routeParams', 'notesStorage',
                function ($rootScope, $scope, $routeParams, notesStorage) {

        var postId = $routeParams.id;

        $scope.note = notesStorage.getNote(postId);

    }]);