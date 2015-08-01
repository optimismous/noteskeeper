'use strict';

angular.module('notesKeeper')

    .directive('nkTimeago', function ($timeout, relativeTimeFilter) {
        return {
            require: '',
            link: function (scope, element, attrs) {
                var timeoutId;
                var timeago = scope.note.createdOn;

                var updateUI = function () {
                    element.text(relativeTimeFilter(timeago));
                };

                var updateLater = function () {
                    timeoutId = $timeout(function() {
                        updateUI();
                        updateLater();
                    }, 10000);
                };

                element.bind('$destroy', function() {
                    $timeout.cancel(timeoutId);
                });

                updateLater();
            }
        }
    });