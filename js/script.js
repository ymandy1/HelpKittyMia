const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');


canvas.width = 900;
canvas.height = 600;


const kittenImg = new Image();
kittenImg.src = '../img/gatinha_mae.png'; 


const player = {
    x: 80, 
    y: canvas.height - 260,
    width: 340, 
    height: 300,
    speed: 5,
    image: kittenImg 
};


let rightPressed = false;
let leftPressed = false;
let isJumping = false;
let jumpHeight = 100;
let jumpSpeed = 10;
let gravity = 2.8;


function drawPlayer() {
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function animate() {
    clearCanvas();
    movePlayer(); 
    drawPlayer();
    requestAnimationFrame(animate);
}


function startGame() {
    window.location.href = '../html/index.html'; 
}


const backgroundImage = new Image();
backgroundImage.src = '../img/background_2.png'; 

backgroundImage.onload = function() {
    drawBackground();
    animate(); 
};


function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}


document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);


function keyDownHandler(e) {
    if(e.key === 'ArrowRight') {
        rightPressed = true;
    } else if(e.key === 'ArrowLeft') {
        leftPressed = true;
    } else if(e.key === ' ' && !isJumping) { 
        isJumping = true;
        jump();
    }
}

function keyUpHandler(e) {
    if(e.key === 'ArrowRight') {
        rightPressed = false;
    } else if(e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function movePlayer() {
    if(rightPressed) {
        player.x += player.speed;
    } else if(leftPressed) {
        player.x -= player.speed;
    }

    
    if(player.x < 0) {
        player.x = 0;
    } else if(player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}


function jump() {
    let jumpCount = 0;

    
    function jumpAnimation() {
        if(jumpCount < jumpHeight) {
            player.y -= jumpSpeed;
            jumpCount += jumpSpeed;
            requestAnimationFrame(jumpAnimation);
        } else {
        
            fall();
        }
    }


    function fall() {
        if(player.y < canvas.height - player.height) {
            player.y += gravity;
            requestAnimationFrame(fall);
        } else {
            
            isJumping = false;
            player.y = canvas.height - player.height;
        }
    }


    jumpAnimation();
}
