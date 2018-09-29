// Enemies our player must avoid
class Enemy{
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.leftBound = 0;
        this.rightBound = 404;
        this.height = 80;
        this.width = 55;
       
    }

    // Draw the enemy on the screen, required method for game    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if(this.x > this.rightBound){
            this.x = this.leftBound;
        }else {
            this.x += this.speed * dt;
        }

        //box collision test
      if(this.x < player.x  + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y){
                    console.log('player touched');
                //collision detected
               player.resetPlayer();
            }
        
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 404;
        this.key = 0;
        this.topBound = 404 - 83*5;
        this.bottomBound = 404;
        this.leftBound = 0;
        this.rightBound = 404;
        this.width = 85;
        this.height = 80;
    }

    update() {
        if(this.y === this.topBound){
            alert('Congratulations on reaching the end!');
            this.resetPlayer();
        }
    
        switch(this.key){
            case 'up':
            if(this.y !== this.topBound){
                this.y = this.y - 83;
            }
            break;
            case 'down':
            if(this.y !== this.bottomBound){
                this.y += 83;
            }
            break;
            case 'left':
            if(this.x !== this.leftBound){
                this.x -= 101;
            }
            break;

            case 'right':
            if(this.x !== this.rightBound){
                this.x += 101;
            }
            break;
            default:
            break;

        }
     
        this.key = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode) {
        this.key = keyCode;
    }

    resetPlayer() {
        this.x = 202;
        this.y = 404;

        this.render();
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player;

// instantiate enemies
const enemy1 = new Enemy(125, 230, 120),
    enemy2 = new Enemy(101, 60, 100),
    enemy3 = new Enemy(302, 140, 95),
    enemy4 = new Enemy(383, 230, 150);

const allEnemies = [enemy1, enemy2, enemy3, enemy4];

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
