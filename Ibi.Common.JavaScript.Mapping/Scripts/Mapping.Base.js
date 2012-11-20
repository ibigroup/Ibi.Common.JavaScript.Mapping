(function (window, google, undefined) {
    "use strict";

    var
        // The basic map object
        map,
        
        // Set up a  local reference to the document
        document = window.document,
        
        // Define a local copy of the mapping base
        mappingBase = function (selector) {
            return new mappingBase.fn.init(selector);
        };

    mappingBase.fn = mappingBase.prototype = {
        constructor: mappingBase,
        
        init: function (selector) {
            map = null;
            
            if (typeof selector === "function") {
                return this.ready(selector);
            }
            else if (typeof selector === "string") {
                return this.create(selector);
            }

            return this;
        },
        
        ready: function (callback) {
            var done = false; //Create a variable called done with false as value;

            // Checking every 10 milliseconds if the document.body and document.getElementById are ready to work with them
            // If the they are ready to work then we change done to true;
            var checkLoaded = setInterval(function () {
                if (document.body && document.getElementById) {
                    done = true;
                }
            }, 10);

            // Checking every 10 milliseconds if done == true
            // If it is true then execute the callback
            var checkInter = setInterval(function () {
                if (done) {
                    clearInterval(checkLoaded);
                    clearInterval(checkInter);
                    callback();
                }
            }, 10);
        },
        
        create: function (containerId, options) {
            var mapOptions = options || {
                zoom: 8,
                center: new google.maps.LatLng(-34.397, 150.644),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById(containerId), mapOptions);

            return this;
        },
        
        getMap: function () {
            return map;
        }
    };
    
    // Give the init function the mappingBase prototype for later instantiation
    mappingBase.fn.init.prototype = mappingBase.fn;

    // Set up support for extending the library
    mappingBase.extend = mappingBase.fn.extend = function() {

    };

    // Expose mapping to the global object
    window.$mapping = mappingBase;

})(window, google);