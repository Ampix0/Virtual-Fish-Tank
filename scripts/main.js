//=============================
//======  Create Canvas  ======
//=============================

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 16 * 50;
canvas.height = 9 * 50;
canvas.style.border = "solid 1px #000";
var gameBox = document.getElementById('canvasContainer');
gameBox.appendChild(canvas);

//=======================
//======  ASSETS   ======
//=======================
var fishImageReady = false;
var fishImage = new Image();
fishImage.onload = function () {
    fishImageReady = true;
}
fishImage.src = 'assets/fish.png';

//

var fishReverseImageReady = false;
var fishReverseImage = new Image();
fishReverseImage.onload = function () {
    fishReverseImageReady = true;
}
fishReverseImage.src = 'assets/fishReverse.png';



//=======================
//======    LIBS   ======
//=======================



//=======================
//======  OBJECTS  ======
//=======================

var tank = {
    fish: [],
    money: 100,
    level: 0,
}

function fish(x, y, vx, vy, speed) {
    //Physics
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.speed = speed;

    //Properties
    this.age = 0;
    this.hunger = 0;
    this.draw = function () { 
        var direction;
        if (this.vx > 0){
            direction = fishImage;
        }
        else{
            direction = fishReverseImage;
        }
        ctx.drawImage(direction, this.x, this.y);
        
    };


    this.update = function (mod) {

        //Reverse if hit sides of tank
        if (this.x > (canvas.width - 32) || this.x < 0) {
            this.vx = this.vx * -1;
        }
        
        this.y = (Math.sin(this.age * 0.005) * 20) + 50;


        this.x += this.vx * mod;

        this.age++;
    };
}

//=======================
//====== GET INPUT ======
//=======================
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

//=======================
//======   RENDER  ======
//=======================


function render() {

    //Draw Background
    function renderBackground(clean) {

        var color1 = {
            h: 190,
            s: 80,
            l: 60,
        };
        var color2 = {
            h: 190,
            s: 80,
            l: 20,
        };

        var gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
        gradient.addColorStop(0, tinycolor({
            h: color1.h * clean,
            s: color1.s,
            l: color1.l
        }));
        gradient.addColorStop(1, tinycolor({
            h: color2.h * clean,
            s: color2.s,
            l: color2.l
        }));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }



    //==
    //Exec
    //==

    renderBackground(1); //Draw Background

    if (fishImageReady) {

        for (i = 0; i < tank.fish.length; i++) { //for each fish in the tank
            tank.fish[i].draw();
        }

    } //Draw Fish

}


//=======================
//======  UPDATE   ======
//=======================
function update(mod) {


    for (i = 0; i < tank.fish.length; i++) { //for each fish in the tank
        tank.fish[i].update(mod);
    }


};

//=======================
//======   LOOP    ======
//=======================

function main() {
    var now = Date.now();
    var delta = now - then;

    // Cross-browser support for requestAnimationFrame
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    update(delta / 100);
    render();

    then = now;
    console.log('new frame');
    requestAnimationFrame(main);

}

function addFish() {
    tank.fish.push(spawnFish);
}

//=======================
//======   EXEC    ======
//=======================
var then = Date.now();

var spawnFish = new fish(400, 50, 3, 9, 100);
var spawnFish2 = new fish(450, 90, 8, 2, 200);
tank.fish.push(spawnFish);
tank.fish.push(spawnFish2);
main();