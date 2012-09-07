$mapping.fn.move = (function(){

    console.log(this.map);   

    var right = function () {
        alert("move right");
    };

    var left = function () {
        alert("move left");
    };

    return {
        right: right,
        left: left
    };

})();