/*
creates a list where keyBuffer["key"] returns whether the "key" is currently pressed down
eg.: keyBuffer["a"] returns true if the "a" key is pressed down
keys that haven't been pressed before return undefined
@qertend
*/
let keyBuffer = [];
window.addEventListener("keydown", function(event)  {keyBuffer[event.key] = event.type == "keydown";});
window.addEventListener("keyup", function(event)  {keyBuffer[event.key] = event.type == "keydown";});


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