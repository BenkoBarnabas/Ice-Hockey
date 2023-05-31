/**
* creates a list where keyBuffer["key"] returns whether the "key" is currently pressed down
* eg.: keyBuffer["a"] returns true if the "a" key is pressed down
* keys that haven't been pressed before return undefined
* @qertend
*/
let keyBuffer = [];
window.addEventListener("keydown", function(event)  {keyBuffer[event.key] = event.type == "keydown";});
window.addEventListener("keyup", function(event)  {keyBuffer[event.key] = event.type == "keydown";});

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
 * The class used to build **Player** objects
 */
class Player {
    /**
     * 
     * @param {string} id the id of the svg object representing the player
     * @param {float} x the X coordinate of the start position
     * @param {float} y the Y coordinate of the start position
     * @param {object} controls an object with four properties specifying the movement keys: forward, backward, left, right
     */
    constructor(id, x, y, controls) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.forward = controls.forward;
        this.backward = controls.backward;
        this.left = controls.left;
        this.right = controls.right;
        //the current velocity of the player
        this.vx = 0;
        this.vy = 0;
    }
    /**
     * 
     * @param {float} cx the new X coordinate for the center
     */
    setCX(cx) {
        document.getElementById(this.id).attributes.cx.value = cx;
    }
    /**
     * 
     * @param {float} cy the new Y coordinate for the center
     */
    setCY(cy) {
        document.getElementById(this.id).attributes.cy.value = cy;
    }

    /**
     * updates the state of the **Player** object
     * 
     * should be called every frame
     */
    update() {
        /**
         * @todo logic goes here
         */
        this.setCX(this.x);
        this.setCY(this.y);
    }
}

//TEMP
const player1 = new Player("player1", 200, 200, player1Controls);

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

//renderFrame();