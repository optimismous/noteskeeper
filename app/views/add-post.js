'use strict';

angular.module('notesKeeper.addPost', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-post', {
            templateUrl: 'app/views/add-post.html',
            controller: 'AddPostCtrl'
        })
    }])

    .controller('AddPostCtrl', ['$rootScope', '$scope', 'notesStorage', function ($rootScope, $scope, notesStorage) {

        $scope.notes = notesStorage.getNotes();

        $scope.title = '';

        $scope.onKeydown = function (e) {
            // При нажатии ctrl+enter добавляем заметку
            if (e.ctrlKey === true && e.keyCode === 13) {
                $scope.addNote();
            }
        };

        $scope.remainingSymbols = $scope.symbolsMax = 150;

        $scope.getRemainingSymbols = function () {
            $scope.remainingSymbols = $scope.symbolsMax - $scope.noteText.length;
        };

        $scope.addNote = function () {
            var text = $scope.noteText;
            var tStamp = Date.now();

            if (!text || !text.trim()) return;

            $rootScope.notesStorage.putNote(
                {
                    title: $scope.title.trim(),
                    text: text,
                    createdOn: tStamp
                }
            );

            $scope.title = '';
            $scope.noteText = '';
            $scope.remainingSymbols = $scope.symbolsMax;

        };

    }]);