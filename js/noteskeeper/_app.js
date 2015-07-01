(function () {
    var app = angular.module('notesKeeper', ['ngRoute']);

    app.controller('NotesKeeperController', function ($scope, $route, $routeParams, $location, $interval) {
        var notesKeeper = this;

        notesKeeper.notes = notesStorage.getNotes();

        notesKeeper.addNote = function () {

            var text = notesKeeper.noteText;

            if (!text || !text.trim()) return;

            notesKeeper.noteText = '';

            notesStorage.putNote({
                    text: text.trim(),
                    createdOn: (new Date).getTime(),
                    timeAgo: 'Меньше минуты назад'
                });
        };

        notesKeeper.removeNote = function (note) {
            notesStorage.removeNote(note);
        };

        notesKeeper.refreshTimeAgo = function () {
            var datesDiff,
                createdOn,
                seconds,
                minutes,
                hours,
                days,
                createdDate,
                monthDay,
                month,
                year,
                outputTime,
                curTime;

                curTime = (new Date()).getTime();

            for (var i = 0, max = notesKeeper.notes.length; i < max; i++) {
                createdOn = notesKeeper.notes[i].createdOn;

                datesDiff = curTime - createdOn;

                seconds = Math.abs(datesDiff) / 1000;
                minutes = Math.round(seconds / 60);
                // 45 минут округляем до часа
                hours = Math.floor(minutes / 60 + 0.25);
                days = Math.floor(hours / 24);

                createdDate = new Date(createdOn);
                monthDay = createdDate.getDate();

                switch (true) {
                    case helpers.isToday(createdOn) && hours >= 1:
                        notesKeeper.notes[i].timeAgo = 'Около ' + hours + ' ' + helpers.plural(hours, ['часа', 'часов']) + ' назад';
                        break;
                    case helpers.isToday(createdOn) && minutes > 0:
                        notesKeeper.notes[i].timeAgo = minutes + ' ' + helpers.plural(minutes, ['минуту', 'минуты', 'минут']) + ' назад';
                        break;
                    case minutes == 0:
                        notesKeeper.notes[i].timeAgo = 'Меньше минуты назад';
                        break;
                    case helpers.isYesterday(createdOn):
                        outputTime = ('0' + createdDate.getHours()).slice(-2) + ':' +
                            ('0' + createdDate.getMinutes()).slice(-2);
                        notesKeeper.notes[i].timeAgo = 'Вчера, в ' + outputTime;
                        break;
                    default:
                        month = createdDate.getMonth() + 1;
                        year = createdDate.getFullYear();
                        notesKeeper.notes[i].timeAgo = ('0' + monthDay).slice(-2) + ' ' +
                            helpers.getMonthName(month, 'genitive') + ' ' + year + ' года';
                }

            }
        };

        notesKeeper.refreshTimeAgo();

        $interval(function () {
            notesKeeper.refreshTimeAgo();
        }, 10000);

    });
})();