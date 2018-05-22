// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Posições (X e Y) e velocidade 
    this.x = x;
    this.y = y;
    this.speed = speed;

    // sprite dos insetos
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    /* Quando os insetos saírem da tela, a posição em X será
     ** retornada para -105 e a velocidade será recalculada.
     */
    if (this.x > 505) {
        this.x = -105;
        this.speed = 100 + Math.random() * speedIncrement;
    }

    /* Caso haja colisão entre o Player e o inimigo, o Player irá
     ** voltar para sua posição inicial, a pontuação retornará à 0 e 
     ** a velocidade dos inimigos será igual ao início do game.
     */
    if (player.x < this.x + 65 && player.x + 40 > this.x &&
        player.y < this.y + 30 && player.y + 30 > this.y) {
        player.x = 200;
        player.y = 375;
        score = 0;
        speedIncrement = 50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;

    // Sprite do Player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

    // As condições abaixo não irão permitir que o Player 
    // saia da área do canvas.
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.y > 375) {
        this.y = 375;
    }
    /* Aqui será verificado se o Player alcançou a água
     ** Se sim, o usuário ganhará 1 ponto e os inimigos poderão ser
     ** 15% mais rápido.
     */
    if (this.y === -25) {
        this.x = 200;
        this.y = 375;
        score += 1;
        speedIncrement = speedIncrement + (speedIncrement * 0.15);
        console.log(`Velocidade: ${speedIncrement} Pontos: ${score}`);
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (command) {
    if (command == 'left') {
        this.x -= 100;
    } else if (command == 'right') {
        this.x += 100;
    } else if (command == 'up') {
        this.y -= 80;
    } else if (command == 'down') {
        this.y += 80;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy;
var allEnemies = [];
var enemiesPosition = [58, 142, 225];
var player = new Player(200, 375);

var speedIncrement = 50;
var score = 0;

enemiesPosition.forEach(function (y) {
    enemy = new Enemy(-105, y, 100 + Math.random() * speedIncrement);
    allEnemies.push(enemy);

});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});