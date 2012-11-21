(function(window, google, undefined) {
    "use strict";

    var
        // The basic map object
        map,
        
        // Set up a  local reference to the document
        document = window.document,
        
        // Define a local copy of the mapping base
        mappingBase = function(selector, options) {
            return new mappingBase.fn.init(selector, options);
        },
        
        // Helper methods,
        isType = function (item, type) {
            return typeof item === type;
        },
        
        isFunction = function(item) {
            return isType(item, "function");
        },
        
        isString = function(item) {
            return isType(item, "string");
        };

    mappingBase.fn = mappingBase.prototype = {
        constructor: mappingBase,

        init: function(selector, options) {
            map = null;

            if (isFunction(selector)) {
                return this.ready(selector);
            }

            if (isString(selector)) {
                return this.create(selector, options);
            }

            return this;
        },

        ready: function(callback) {
            var done = false, // Create a variable called done with false as value;

            // Checking every 10 milliseconds if the document.body and document.getElementById are ready to work with them
            // If the they are ready to work then we change done to true;
            checkLoaded = setInterval(function() {
                if (document.body && document.getElementById) {
                    done = true;
                }
            }, 10),
                
            // Checking every 10 milliseconds if done == true
            // If it is true then execute the callback
            checkInter = setInterval(function() {
                if (done) {
                    clearInterval(checkLoaded);
                    clearInterval(checkInter);
                    callback();
                }
            }, 10);
        },

        create: function(containerId, options) {

            // Set up options
            var mapOptions = options || { };
            mapOptions.zoom = mapOptions.zoom || 8;
            mapOptions.center = mapOptions.center || new google.maps.LatLng(-34.397, 150.644);
            mapOptions.mapTypeId = mapOptions.mapTypeId || google.maps.MapTypeId.ROADMAP;

            // Create map
            map = new google.maps.Map(document.getElementById(containerId), mapOptions);

            // Success callback
            if (isFunction(mapOptions.success)) {
                mapOptions.success(map);
            }

            return this;
        },

        getMap: function() {
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