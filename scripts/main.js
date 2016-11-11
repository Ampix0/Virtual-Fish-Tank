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
//======    Menu   ======
//=======================
var goldLable = document.getElementById('gold');

function updateGold() {
    goldLable.innerHTML = tank.money;
}

//=======================
//======  ASSETS   ======
//=======================
var spriteFish = new Image();
var spriteFishReady = false;
spriteFish.src = 'assets/sprites.png';
spriteFish.iconSize = 32;
spriteFish.onload = function() {
    spriteFishReady = true;
};




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

function fish(x, y, vx, vy, speed, type) {
    //Physics
    this.x = x;
    this.y = y;
    this.type = type;
    this.originY = y;
    this.vx = vx;
    this.vy = vy;
    this.speed = speed;
    this.spriteYPos = this.type * spriteFish.iconSize;
    this.spriteXPos = 0;

    //Properties
    this.age = 0;
    this.hunger = 0;
    this.draw = function (xpos = this.spriteXPos, ypos = this.spriteYPos, direction = this.vx) {
        
        if(direction < 0) {
            xpos = spriteFish.iconSize;
        }else {
            xpos = 0;
        }


        ctx.drawImage(spriteFish, xpos, ypos, spriteFish.iconSize, spriteFish.iconSize, this.x, this.y, spriteFish.iconSize, spriteFish.iconSize);

    };


    this.update = function (mod) {

        //Reverse if hit sides of tank
        if (this.x > (canvas.width - 32) || this.x < 0) {
            this.vx = this.vx * -1;
        }

        this.vy = (Math.sin(this.age * 0.005) * 20);
        this.y = this.vy + this.originY;


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

    if (spriteFishReady) {

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
   // console.log('new frame');
    requestAnimationFrame(main);

}

function addFish() {

    if (tank.money >= 20) {
        var x = Math.random() * (1, 799);
        var y = Math.random() * (20, 200) + 9;
        var yv = Math.random() * (1, 10) + 10;
        var xv = Math.random() * (1, 10) + 10;
        var speed = Math.random() * (25, 500) + 25;

        tank.fish.push(new fish(x, y, xv, yv, speed, 1));

        tank.money -= 20;
        updateGold();
    }



}

//=======================
//======   EXEC    ======
//=======================
var then = Date.now();

var spawnFish = new fish(400,50,3,9,100,0);
tank.fish.push(spawnFish);
updateGold();
main();