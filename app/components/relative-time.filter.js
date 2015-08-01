'use strict';

angular.module('notesKeeper')

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
                    month = createdDate.getMonth();
                    year = createdDate.getFullYear();
                    return monthDay + ' ' +
                        helpers.getMonthName(month, 'genitive') + ' ' + year + ' года';
            }
        };
    }]);