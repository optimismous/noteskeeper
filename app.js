(function () {
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

    .filter('relativeTime', ['helpers', function (helpers) {
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
    }])

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
    })

    .factory('notesStorage', function () {
            var notesStorage;
            var domStorage = localStorage;
            var notesKey = 'notes';

            notesStorage = {
                _notes: {},
                _init: function () {
                    try {
                        this._notes = JSON.parse(domStorage[notesKey]);
                    } catch(e) {
                        this._notes = {};
                    }

                    return notesStorage;
                },
                putNote: function (key, note) {
                    if (key && note instanceof Object) {
                        this._notes[key] = note;
                        domStorage[notesKey] = JSON.stringify(this._notes);
                        return true;
                    }

                    return false;
                },
                getNotes: function () {
                    return this._notes;
                },
                clear: function () {
                    domStorage.removeItem(notesKey);
                },
                removeNote: function (key) {
                    delete this._notes[key];

                    domStorage[notesKey] = JSON.stringify(this._notes);
                }
            };

            return notesStorage._init();
        })

        .factory('helpers', function () {
            return {
                plural: function (number, parts) {
                    parts[1] || (parts[1] = parts[0]);
                    parts[2] || (parts[2] = parts[1]);

                    number = Math.abs(number) % 100;
                    var c = number % 10;
                    return 10 < number && 20 > number ? parts[2] : 1 < c && 5 > c ? parts[1] : 1 == c ? parts[0] : parts[2];
                },
                getMonthName: function (monthNumber, mode) {
                    monthNumber = monthNumber || 0;
                    mode = mode || 'subjective';

                    var months = {
                        subjective: [
                            'январь',
                            'февраль',
                            'март',
                            'апрель',
                            'май',
                            'июнь',
                            'июль',
                            'август',
                            'сентябрь',
                            'октябрь',
                            'ноябрь',
                            'декабрь'
                        ],
                        genitive: [
                            'января',
                            'февраля',
                            'марта',
                            'апреля',
                            'мая',
                            'июня',
                            'июля',
                            'августа',
                            'сентября',
                            'октября',
                            'ноября',
                            'декабря'
                        ]
                    };

                    return months[mode][monthNumber];
                },
                isYesterday: function (timestamp) {
                    var _24hoursInMs = 24*60*60*1000;
                    var todayMidnight = (new Date()).setHours(0, 0, 0, 0);

                    return todayMidnight > timestamp && todayMidnight - timestamp < _24hoursInMs;
                },
                isToday: function (timestamp) {
                    var _24hoursInMs = 24*60*60*1000;
                    var todayMidnight = (new Date()).setHours(0, 0, 0, 0);

                    return timestamp > todayMidnight && timestamp < todayMidnight + _24hoursInMs;
                }
            }
        });

})();