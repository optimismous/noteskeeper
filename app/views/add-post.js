'use strict';

angular.module('notesKeeper.addPost', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-post', {
            templateUrl: 'app/views/add-post.html',
            controller: 'AddPostCtrl'
        })
        .when('/edit-post/:id', {
            templateUrl: 'app/views/add-post.html',
            controller: 'AddPostCtrl'
        })
    }])

    .controller('AddPostCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'notesStorage', function ($rootScope, $scope, $routeParams, $location, notesStorage) {

        var id = $routeParams.id || null;
        var editedNote;

        if (id) {
            editedNote = notesStorage.getNote(id);
        }

        if (editedNote) {
            $scope.title = editedNote.title;
            $scope.noteText = editedNote.text;
        } else {
            $scope.title = '';
            $scope.noteText = '';
        }

        $scope.notes = notesStorage.getNotes();

        $scope.onKeydown = function (e) {
            // При нажатии ctrl+enter добавляем заметку
            if (e.ctrlKey === true && e.keyCode === 13) {
                $scope.addNote();
            }
        };

        $scope.symbolsMax = 150;

        $scope.getRemainingSymbols = function () {
            return $scope.symbolsMax - $scope.noteText.length;
        };

        $scope.addNote = function () {
            var text = $scope.noteText;

            if (!text || !text.trim()) return;

            if (!editedNote) {
                $rootScope.notesStorage.putNote(
                    {
                        title: $scope.title.trim(),
                        text: text
                    }
                );
                $scope.title = '';
                $scope.noteText = '';
            } else {
                $rootScope.notesStorage.updateNote(
                    id,
                    {
                        title: $scope.title.trim(),
                        text: text
                    }
                );
                $location.path('/add-post')
            }
        };

    }]);