pixel = require("node-pixel");
five = require("johnny-five");
 
var board = new five.Board(opts);
var strip = null;
 
board.on("ready", function() {
 
    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 5, length: 4}, ], // this is preferred form for definition
        gamma: 2.8, // set to a gamma that works nicely for WS2812
    });
 
    strip.on("ready", function() {
        // do stuff with the strip here.
    });
});
