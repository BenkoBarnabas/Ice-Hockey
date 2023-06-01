//INPUTS

document.onkeydown = function(key){  //key = object with lots of info key.key is the key pressed
    switch(String(key.key)) {
        case "w":
            player1Inputs.w = true
            break;
        case "a":
            player1Inputs.a = true
            break;
        case "s":
            player1Inputs.s = true
            break;
        case "d":
            player1Inputs.d = true
            break;
        case "f":
            player1Inputs.f = true
            break;
    }
}
document.onkeyup = function(key){  //key = object with lots of info key.key is the key pressed
    switch(String(key.key)) {
        case "w":
            player1Inputs.w = false
            break;
        case "a":
            player1Inputs.a = false
            break;
        case "s":
            player1Inputs.s = false
            break;
        case "d":
            player1Inputs.d = false
            break;
    }
}

//PARAMS
let player1 = document.getElementById("player1")
let player1Vector = { // v = velocity 
    xv: 0,
    yv: 0 
}
let player1Inputs = {
    w: false,
    a: false,
    s: false,
    d: false,
    f: false
}

let boostValue = 2
let lastDashed = Date.now()
let dashCooldown = 5000

/**
 * @todo make modifiable by user
 */
const player1Controls = {
    forward: "w",
    backward: "s",
    left: "a",
    right: "d"
}
/**
 * @todo make modifiable by user
 */
const player2Controls = {
    forward: "w",
    backward: "s",
    left: "a",
    right: "d"
}

/**
 * The class used to build Player objects
 */
class Player {
    /**
     * 
     * @param {float} x the X coordinate of the start position
     * @param {float} y the Y coordinate of the start position
     * @param {object} controls an object with four properties representing the controlling keys: forward, backward, left, right
     */
    constructor(x, y, controls) {
        this.x = x;
        this.y = y;
        this.forward = controls.forward;
        this.backward = controls.backward;
        this.left = controls.left;
        this.right = controls.right;
    }

    update() {

    }
}

/**
 * gets executed every frame
 * 
 * `important:` frequency depends on the client's display's framerate
 */
function renderFrame() {
    /* 
    update function goes here
    */
    requestAnimationFrame(renderFrame);
}
//function has to be called once to start the loop
renderFrame();