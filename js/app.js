// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    this.y = 60 + 83 * row;
    this.speed = Math.random() * 250;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = this.x + dt * this.speed;
    if (newX < 606) {
        this.x = newX;
    } else {
        this.reset();
    }
};

Enemy.prototype.getPosition = function() {
    return {x: this.x, y: this.y};
}

Enemy.prototype.reset = function() {
    this.x = -101;
    this.speed = Math.random() * 250;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
    this.skins = ['images/char-boy.png',
                  'images/char-cat-girl.png',
                  'images/char-horn-girl.png',
                  'images/char-princess-girl.png'];
}

Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if(this.x - 101 < 0) {
                return;
            }
            this.x -= 101;
            break;
        case 'up':
            if(this.y - 83 < -30) {
                return;
            }
            this.y -= 83;
            break;
        case 'right':
            if(this.x + 101 > 404) {
                return;
            }
            this.x += 101;
            break;
        case 'down':
            if(this.y + 83 > 404) {
                return;
            }
            this.y += 83;
            break;
        default:
            throw new Error('Wrong direction');
    }
}

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
}

Player.prototype.getPosition = function() {
    return {x: this.x, y: this.y};
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

Player.prototype.changeSkin = function() {
    var indexSkin = parseInt(Math.random() * this.skins.length);
    this.sprite = this.skins[indexSkin];
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(i));
}

var player = new Player();

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
