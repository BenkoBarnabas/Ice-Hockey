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