(function () {
    'use strict';

    angular.module('notesKeeper', [
        'ngRoute',
        'notesKeeper.view1',
        'notesKeeper.view2'
    ])

    .run(['$rootScope', function ($rootScope) {
        $rootScope.notes = notesStorage.getNotes();
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])

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
    })

    .filter('relativeTime', function () {
        return function (createdOn) {
                var datesDiff,
                    seconds,
                    minutes,
                    hours,
                    createdDate,
                    monthDay,
                    month,
                    year,
                    outputTime,
                    curTime;

                curTime = (new Date()).getTime();

                datesDiff = curTime - createdOn;

                seconds = Math.abs(datesDiff) / 1000;
                minutes = Math.round(seconds / 60);
                // 45 минут округляем до часа
                hours = Math.floor(minutes / 60 + 0.25);

                createdDate = new Date(createdOn);

                monthDay = createdDate.getDate();

                switch (true) {
                    case helpers.isToday(createdOn) && hours >= 1:
                        return 'Около ' + hours + ' ' + helpers.plural(hours, ['часа', 'часов']) + ' назад';
                    case helpers.isToday(createdOn) && minutes > 0:
                        return minutes + ' ' + helpers.plural(minutes, ['минуту', 'минуты', 'минут']) + ' назад';
                    case minutes == 0:
                        return 'Меньше минуты назад';
                    case helpers.isYesterday(createdOn):
                        outputTime = ('0' + createdDate.getHours()).slice(-2) + ':' +
                            ('0' + createdDate.getMinutes()).slice(-2);
                        return 'Вчера, в ' + outputTime;
                    default:
                        month = createdDate.getMonth() + 1;
                        year = createdDate.getFullYear();
                        return ('0' + monthDay).slice(-2) + ' ' +
                            helpers.getMonthName(month, 'genitive') + ' ' + year + ' года';
                }

        };
    })

    .filter('orderObjectBy', function() {
        return function (items, field, reverse) {
            var filtered = [];

            angular.forEach(items, function(item) {
                filtered.push(item);
            });

            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });

            if (reverse) filtered.reverse();

            return filtered;
        };
    });

})();