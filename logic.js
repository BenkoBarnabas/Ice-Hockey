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

let boostValue = 20


//MAIN
function update() {
    //logic
    Player1InputHandler()
    if(Math.abs(player1Vector.xv) < 0.01)
    {
        player1Vector.xv = 0
    }
    else {
        player1Vector.xv *= 0.96
    }
    if(Math.abs(player1Vector.yv) < 0.01)
    {
        player1Vector.yv = 0
    }
    else {
        player1Vector.yv *= 0.96
    }
    Player1Movements()

    //end
    requestAnimationFrame(update)
}


function Player1InputHandler() {
    if(player1Inputs.w == true)
    {
        player1Vector.yv -= 0.7
    }
    if(player1Inputs.s == true)
    {
        player1Vector.yv += 0.7
    }
    if(player1Inputs.d == true)
    {
        player1Vector.xv += 0.7
    }
    if(player1Inputs.a == true)
    {
        player1Vector.xv -= 0.7
    }
    if(player1Inputs.f == true)
    {
        player1Inputs.f = false
        player1Vector.xv =  (player1Vector.xv / player1Vector.xv + player1Vector.yv) + boostValue
        player1Vector.yv =  (player1Vector.yv / player1Vector.xv + player1Vector.yv) + boostValue
        console.log("dash")
    }
}

function Player1Movements() {
    player1.setAttribute("cx", (Number(player1.getAttribute("cx")) + player1Vector.xv))
    player1.setAttribute("cy", (Number(player1.getAttribute("cy")) + player1Vector.yv))
}
