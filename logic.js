//INPUTS
//PLAYER1
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
        case "i":
            player2Inputs.w = true
            break;
        case "j":
            player2Inputs.a = true
            break;
        case "k":
            player2Inputs.s = true
            break;
        case "l":
            player2Inputs.d = true
            break;
        case "h":
            player2Inputs.f = true
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
        case "i":
            player2Inputs.w = false
            break;
        case "j":
            player2Inputs.a = false
            break;
        case "k":
            player2Inputs.s = false
            break;
        case "l":
            player2Inputs.d = false
            break;
    }
}


//PARAMS
let player1 = document.getElementById("player1")
let player2 = document.getElementById("player2")
let board = document.getElementById("board")
let arrow1 = document.getElementById("arrow1")
let arrow2 = document.getElementById("arrow2")

//sliderObjecs
let slidinessSlider = document.getElementById("slidiness")
let wallBouncinessSlider = document.getElementById("wallBounciness")
let accelerationSlider = document.getElementById("acceleration")

let adjustableSliders = [wallBouncinessSlider,slidinessSlider,accelerationSlider]

//sliderTexts
let slidinessValue = document.getElementById("slidinessValue")
let wallBouncinessValue = document.getElementById("wallBouncinessValue")
let accelerationValue = document.getElementById("accelerationValue")

let adjustableValues = [wallBouncinessValue,slidinessValue,accelerationValue]


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

let player2Vector = { // v = velocity 
    xv: 0,
    yv: 0,
    x: 0,
    y: 0,
    r: Number(player2.getAttribute("r"))
}

let player2Inputs = {
    w: false,
    a: false,
    s: false,
    d: false,
    f: false
}

let boostValue = 2

let lastDashedPlayer1 = Date.now()

let lastDashedPlayer2 = Date.now()

let wallBounciness = 0.5
let slidiness = 0.98
let acceleration = 0.7
let dashCooldown = 500

let adjustables = [wallBounciness,slidiness,acceleration]
console.log(adjustables);

const boardParameters = {
    x: Number(board.getAttribute("x")),
    y: Number(board.getAttribute("y")),
    height: Number(board.getAttribute("height")),
    width: Number(board.getAttribute("width"))
}


//MAIN
function update() {
    //logic
    PlayerInputHandler()

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



    if(Math.abs(player2Vector.xv) < 0.01)
    {
        player2Vector.xv = 0
    }
    else {
        player2Vector.xv *= slidiness
    }
    if(Math.abs(player2Vector.yv) < 0.01)
    {
        player2Vector.yv = 0
    }
    else {
        player2Vector.yv *= slidiness
    }

    PlayerHandleCollisions()
    PlayerHandleMovements()
    DirectionArrowHandler()

    //end
    requestAnimationFrame(update)
}


function PlayerInputHandler() {
    if(player1Inputs.w && !((player1Vector.y - player1Vector.r) <= boardParameters.y))
    {
        player1Vector.yv -= acceleration
    }
    if(player1Inputs.s && !((boardParameters.y + boardParameters.height) <= (player1Vector.y + player1Vector.r)))
    {
        player1Vector.yv += acceleration
    }
    if(player1Inputs.a && !((player1Vector.x - player1Vector.r) <= boardParameters.x))
    {
        player1Vector.xv -= acceleration
    }
    if(player1Inputs.d && !((boardParameters.x + boardParameters.width) <= (player1Vector.x + player1Vector.r)))
    {
        player1Vector.xv += acceleration
    }
    if(player1Inputs.f && lastDashedPlayer1 < (Date.now() - dashCooldown))
    {
        player1Inputs.f = false
        player1Vector.xv *= boostValue
        player1Vector.yv *= boostValue
        console.log("dash")
        lastDashedPlayer1 = Date.now()
    }

    if(player2Inputs.w && !((player2Vector.y - player2Vector.r) <= boardParameters.y))
    {
        player2Vector.yv -= 0.7
    }
    if(player2Inputs.s && !((boardParameters.y + boardParameters.height) <= (player2Vector.y + player2Vector.r)))
    {
        player2Vector.yv += 0.7
    }
    if(player2Inputs.a && !((player2Vector.x - player2Vector.r) <= boardParameters.x))
    {
        player2Vector.xv -= 0.7
    }
    if(player2Inputs.d && !((boardParameters.x + boardParameters.width) <= (player2Vector.x + player2Vector.r)))
    {
        player2Vector.xv += 0.7
    }
    if(player2Inputs.f && lastDashedPlayer2 < (Date.now() - dashCooldown))
    {
        player2Inputs.f = false
        player2Vector.xv *= boostValue
        player2Vector.yv *= boostValue
        console.log("dash")
        lastDashedPlayer2 = Date.now()
    }
}

function PlayerHandleMovements() {
        player1.setAttribute("cx", (Number(player1.getAttribute("cx")) + player1Vector.xv))
        player1.setAttribute("cy", (Number(player1.getAttribute("cy")) + player1Vector.yv))
        player1Vector.x = Number(player1.getAttribute("cx"))
        player1Vector.y = Number(player1.getAttribute("cy"))

        player2.setAttribute("cx", (Number(player2.getAttribute("cx")) + player2Vector.xv))
        player2.setAttribute("cy", (Number(player2.getAttribute("cy")) + player2Vector.yv))
        player2Vector.x = Number(player2.getAttribute("cx"))
        player2Vector.y = Number(player2.getAttribute("cy"))
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

    if ((player2Vector.x - player2Vector.r) <= boardParameters.x ||(boardParameters.x + boardParameters.width) <= (player2Vector.x + player2Vector.r) ) {
        player2Vector.xv *= -1
        player2Vector.xv += Math.sign(player2Vector.xv)*wallBounciness
        console.log("if be vagyok én most")
    }
    if ((player2Vector.y - player2Vector.r) <= boardParameters.y ||(boardParameters.y + boardParameters.height) <= (player2Vector.y + player2Vector.r) ) {
        player2Vector.yv *= -1
        player2Vector.yv += Math.sign(player2Vector.yv)*wallBounciness
        console.log("if be vagyok én most");
    }
}

function DirectionArrowHandler() {
    arrow1.setAttribute("x1",Number(player1.getAttribute("cx")))
    arrow1.setAttribute("y1",Number(player1.getAttribute("cy")))

    arrow1.setAttribute("x2",((Number(arrow1.getAttribute("x1"))+Math.sign(player1Vector.xv)*12*(Math.sqrt(Math.abs(player1Vector.xv))))))
    arrow1.setAttribute("y2",((Number(arrow1.getAttribute("y1"))+Math.sign(player1Vector.yv)*12*(Math.sqrt(Math.abs(player1Vector.yv))))))

    arrow2.setAttribute("x1",Number(player2.getAttribute("cx")))
    arrow2.setAttribute("y1",Number(player2.getAttribute("cy")))

    arrow2.setAttribute("x2",((Number(arrow2.getAttribute("x1"))+Math.sign(player2Vector.xv)*12*(Math.sqrt(Math.abs(player2Vector.xv))))))
    arrow2.setAttribute("y2",((Number(arrow2.getAttribute("y1"))+Math.sign(player2Vector.yv)*12*(Math.sqrt(Math.abs(player2Vector.yv))))))
}

//SLIDERS



//MAIN
update()
DirectionArrowHandler()
PlayerHandleMovements()
console.log(boardParameters);