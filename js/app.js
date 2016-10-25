// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // random speed for all enemies
    this.speed = Math.floor((Math.random() * 300) + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // if enemy is inside canvas keep incrementing its x coordinate
    if (this.x <= 550) {
        this.x += this.speed * dt;
    }
    // else reset its position
    else {
        this.x = -40;
    }

    // If the player comes within 40px of an enemy's x and y coordinates, reset the game
    if (player.x >= this.x - 40 && player.x <= this.x + 40) {
        if (player.y >= this.y - 40 && player.y <= this.y + 40) {
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class to instantiate new player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

// Handle player movement depending on the pressed key
Player.prototype.handleInput = function(e) {
    // if left key is pressed and player is not on edge of map, decrement x
    if (e === "left" && this.x > 0) {
        this.x = this.x - 100;
    }
    // if right key is pressed and player is not on edge of map increment x
    else if (e === "right" && this.x != 400) {
        this.x = this.x + 100;
    }
    // if up key is pressed increment y
    else if (e === "up") {
        this.y = this.y - 85;
    }
    // if down key is pressed and player is not on edge of map decrement y
    else if (e === "down" && this.y != 400) {
        this.y = this.y + 85;
    }
};

// Update the player position
Player.prototype.update = function() {
    // Reset if player reaches water
    if (this.y < 30) {
        console.log("Winnner!!");
        this.reset();
    }
};

// Reset player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];
allEnemies.push(new Enemy(-40, 60));
allEnemies.push(new Enemy(-40, 60));
allEnemies.push(new Enemy(-40, 145));
allEnemies.push(new Enemy(-40, 145));
allEnemies.push(new Enemy(-40, 225));
allEnemies.push(new Enemy(-40, 225));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
