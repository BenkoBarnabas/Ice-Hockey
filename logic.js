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
let board = document.getElementById("board")
let arrow = document.getElementById("arrow")

//sliderObjecs
let slidinessSlider = document.getElementById("slidiness")
//sliderTexts
let slidinessValue = document.getElementById("slidinessValue")

let player1Vector = { // v = velocity 
    xv: 0,
    yv: 0,
    x: 0,
    y: 0,
    r: Number(player1.getAttribute("r"))
}

let player1Inputs = {
    w: false,
    a: false,
    s: false,
    d: false,
    f: false
}

let lastDashed = Date.now()

let boostValue = 2
let dashCooldown = 500
let wallBounciness = 30
let slidiness = 0.98
let acceleration = 0.7

const boardParameters = {
    x: Number(board.getAttribute("x")),
    y: Number(board.getAttribute("y")),
    height: Number(board.getAttribute("height")),
    width: Number(board.getAttribute("width"))
}


//MAIN
function update() {
    //logic
    Player1InputHandler()
    if(Math.abs(player1Vector.xv) < 0.01)
    {
        player1Vector.xv = 0
    }
    else {
        player1Vector.xv *= slidiness
    }
    if(Math.abs(player1Vector.yv) < 0.01)
    {
        player1Vector.yv = 0
    }
    else {
        player1Vector.yv *= slidiness
    }
    PlayerHandleCollisions()
    PlayerHandleMovements()
    DirectionArrowHandler()
    

    //end
    requestAnimationFrame(update)
}


function Player1InputHandler() {
    if(player1Inputs.w)
    {
        player1Vector.yv -= acceleration
    }
    if(player1Inputs.s)
    {
        player1Vector.yv += acceleration
    }
    if(player1Inputs.a)
    {
        player1Vector.xv -= acceleration
    }
    if(player1Inputs.d)
    {
        player1Vector.xv += acceleration
    }
    if(player1Inputs.f && lastDashed < (Date.now() - dashCooldown))
    {
        player1Inputs.f = false
        player1Vector.xv *= boostValue
        player1Vector.yv *= boostValue
        console.log("dash")
        lastDashed = Date.now()
    }
}

function PlayerHandleMovements() {
        player1.setAttribute("cx", (Number(player1.getAttribute("cx")) + player1Vector.xv))
        player1.setAttribute("cy", (Number(player1.getAttribute("cy")) + player1Vector.yv))
        player1Vector.x = Number(player1.getAttribute("cx"))
        player1Vector.y = Number(player1.getAttribute("cy"))
    
}

function PlayerHandleCollisions() {
    if ((player1Vector.x - player1Vector.r) <= boardParameters.x ||(boardParameters.x + boardParameters.width) <= (player1Vector.x + player1Vector.r) ) {
        player1Vector.xv *= -1
        player1Vector.xv += Math.sign(player1Vector.xv)*wallBounciness
        console.log("if be vagyok én most")
    }
    if ((player1Vector.y - player1Vector.r) <= boardParameters.y ||(boardParameters.y + boardParameters.height) <= (player1Vector.y + player1Vector.r) ) {
        player1Vector.yv *= -1
        player1Vector.yv += Math.sign(player1Vector.yv)*wallBounciness
        console.log("if be vagyok én most");
    }
}

function DirectionArrowHandler() {
    arrow.setAttribute("x1",Number(player1.getAttribute("cx")))
    arrow.setAttribute("y1",Number(player1.getAttribute("cy")))

    arrow.setAttribute("x2",((Number(arrow.getAttribute("x1"))+Math.sign(player1Vector.xv)*12*(Math.sqrt(Math.abs(player1Vector.xv))))))
    arrow.setAttribute("y2",((Number(arrow.getAttribute("y1"))+Math.sign(player1Vector.yv)*12*(Math.sqrt(Math.abs(player1Vector.yv))))))
}


//SLIDERS

slidinessSlider.addEventListener("input", function() {
    var value = slidinessSlider.value; // Get the current value of the slider
    console.log(value);
})
//MAIN
update()
DirectionArrowHandler()
console.log(boardParameters);