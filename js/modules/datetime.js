(function () {
    angular.module('datetime', [])

        .directive('timeago', function($timeout) {
            return function (scope, element, attrs) {
                console.log(scope, element, attrs);
            }
        })

        .filter('relativeTime', function () {
            return function (time) {
                return '10 минут назад';
            };
        });
})();