'use strict';

angular.module('notesKeeper.addPost', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-post', {
            templateUrl: 'app/views/add-post.html',
            controller: 'AddPostCtrl'
        })
    }])

    .controller('AddPostCtrl',
        ['$rootScope',
         '$scope',
         'notesStorage',
         function ($rootScope, $scope, notesStorage) {

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
            var key = $rootScope.notesStorage.getKeyFromStamp(tStamp);

            if (!text || !text.trim()) return;

            if (!$rootScope.notesStorage.notes[key]) {
                $rootScope.notesStorage.putNote(
                    key,
                    {
                        text: text,
                        createdOn: tStamp
                    }
                );
            } else {
                alert('Флэш Гордон, подожди, пожалуйста, 1 микросекунду и попробуй снова.')
            }

            $scope.noteText = '';
            $scope.remainingSymbols = $scope.symbolsMax;

        };

    }]);