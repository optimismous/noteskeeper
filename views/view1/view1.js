'use strict';

angular.module('notesKeeper.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'views/view1/view1.html',
            controller: 'View1Ctrl'
        })
    }])

    .controller('View1Ctrl', ['$rootScope', '$scope', 'notesStorage', function ($rootScope, $scope, notesStorage) {

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
                        text: text.trim(),
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