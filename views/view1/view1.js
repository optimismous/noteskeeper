'use strict';

angular.module('notesKeeper.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'views/view1/view1.html',
            controller: 'View1Ctrl'
        })
    }])

    .controller('View1Ctrl', ['$rootScope', '$scope', 'notesStorage', function ($rootScope, $scope, notesStorage) {

        $scope.addNote = function () {
            var text = $scope.noteText;
            var tStamp = Date.now();
            var key = $rootScope.getKeyFromStamp(tStamp);

            if (!text || !text.trim()) return;

            if (!$rootScope.notes[key]) {
                notesStorage.putNote(
                    key,
                    {
                        text: text.trim(),
                        createdOn: tStamp,
                        timeAgo: 'Меньше минуты назад'
                    }
                );
            } else {
                alert('Флэш Гордон, подожди, пожалуйста, 1 микросекунду и попробуй снова.')
            }

            $scope.noteText = '';

        };

        $scope.removeNote = function (createdOn) {
            var key = $rootScope.getKeyFromStamp(createdOn);
            notesStorage.removeNote(key);
        };

    }]);