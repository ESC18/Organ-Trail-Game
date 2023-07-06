class Player {
    constructor(x, y) {
        this.size = 1;
        this.speed = 50;
        this.angle = 0;
        this.pos = createVector(x, y);
        this.bullets = [];
        this.health = app.max_health;
        this.life = 1;
        this.closedMouth = loadImage('../assets/img/Shawn/Closed-Mouth.png')
        this.openedMouth = loadImage('../assets/img/Shawn/Open-Mouth.png')
        this.playerImage = loadImage('../assets/img/Shawn/Closed-Mouth.png')
    };

    // press A to move left, D to move right, W to move up, S to move down
    move() {
        if (keyIsDown(65) && this.pos.x - this.speed - app.unit/2 >= 0) {
            this.pos.x -= this.speed;
        }
        if (keyIsDown(83) && this.pos.y + this.speed + app.unit/2 <= game.map_height) {
            this.pos.y += this.speed;
        }
        if (keyIsDown(87) && this.pos.y - this.speed - app.unit/2 >= 0) {
            this.pos.y -= this.speed;
        }
        if (keyIsDown(68) && this.pos.x + this.speed + app.unit/2 <= game.map_width) {
            this.pos.x += this.speed;
        }
        if (keyIsDown(74)) {
            this.angle -= 0.1;
        }
        if (keyIsDown(76)) {
            this.angle += 0.1;
        }

        if (keyIsDown(75) || mouseIsPressed) {
            this.shoot();
        } else { this.playerImage = this.closedMouth}

        for (const bullet of this.bullets)
            bullet.move();
    }

    updateAim() {
        const mouseAngle = Math.atan2(mouseY - this.pos.y, mouseX - this.pos.x);
        this.angle = mouseAngle;
    }
    // press J and L to aim and spacebar to shoot or use mouse to aim and left click to shoot.
    shoot() {
        this.bullets.push(makeAmmunition({
            x: this.pos.x,
            y: this.pos.y,
            angle: this.angle,
            type: 'bullet'
        }))
    }


    hit() {
        this.health--;
        return this.health === 0;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        image(this.playerImage, -app.unit / 2, -app.unit / 2, app.unit, app.unit);
        pop();

        for (const bullet of this.bullets)
            bullet.draw();
    }
};

