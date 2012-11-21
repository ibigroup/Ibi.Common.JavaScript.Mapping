$mapping.fn.move = (function () {
    "use strict";

    var defaultDistance = 100;

    var right = function (distance) {
        moveBy(normaliseDistance(distance), 0);
    };

    var left = function (distance) {
        moveBy(0 - normaliseDistance(distance), 0);
    };

    var down = function (distance) {
        moveBy(0, normaliseDistance(distance));
    };

    var up = function (distance) {
        moveBy(0, 0 - normaliseDistance(distance));
    };

    var moveBy = function(distanceX, distanceY) {
        var map = $mapping.fn.getMap();
        map.panBy(distanceX, distanceY);
    };

    var normaliseDistance = function(distance) {
        return distance || defaultDistance;
    };

    return {
        right: right,
        left: left,
        up: up,
        down: down,
        by: moveBy
    };

})();