var helpers = {
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
};