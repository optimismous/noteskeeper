'use strict';

angular.module('notesKeeper')

    .factory('notesStorage', function () {
        var notesStorage;
        var domStorage = localStorage;
        var notesKey = 'notes';
        var notes;

        try {
            notes = JSON.parse(domStorage[notesKey]);
        } catch (e) {
            notes = {};
        }

        notesStorage =  {
            notes: notes,
            getNotesAmount: function () {
                return Object.keys(notesStorage.notes).length;
            },
            putNote: function (key, note) {
                if (key && note instanceof Object) {
                    notesStorage.notes[key] = note;
                    domStorage[notesKey] = JSON.stringify(notesStorage.notes);
                    return true;
                }

                return false;
            },
            getNotes: function () {
                return notesStorage.notes;
            },
            clear: function (notesKey) {
                domStorage.removeItem(notesKey);
            },
            removeNote: function (createdOn) {
                var key = notesStorage.getKeyFromStamp(createdOn);

                delete notesStorage.notes[key];

                domStorage[notesKey] = JSON.stringify(notesStorage.notes);
            },
            getKeyFromStamp: function (tStamp) {
                return '_' + tStamp.toString(16);
            },
            isNotesEmpty: function () {
                return angular.equals({}, notesStorage.notes);
            }
        };

        return notesStorage;

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