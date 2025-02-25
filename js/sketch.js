const app = {
    unit: 32,
    default_speed: 5,
    invalid_coordinate: -100,
    max_health: 20
}

const game = {
    map_width: 0,
    map_height: 0,
    map_pos_x: 0,
    map_pos_y: 0,
    player: {},
    swarm: [],
    buffer: ''
}

const images = {
    tiles: {},
    robots: {
        spider: {},
        wasp: {},
        hornet: {},
        scarab: {},
        creature: {}
    },
    shawn: {
        open: {},
        closed: {}
    }
}

const container = document.querySelector('.container');
let width = container.clientWidth;
let height = container.clientHeight;

function preload() {
    images.tiles = loadImage('../assets/tileset_arranged.png');
    images.robots.spider = loadImage('../assets/Spider.png');
    images.robots.wasp = loadImage('../assets/Wasp.png');
    images.robots.hornet = loadImage('../assets/Hornet.png');
    images.robots.scarab = loadImage('../assets/Scarab.png');
    images.robots.creature = loadImage('../assets/Centipede.png');
    images.shawn.open = loadImage('../assets/PixeledOpen.png');
    images.shawn.closed = loadImage('../assets/PixeledClosed.png');
}

function setup() {
    game.map_width = 10000;
    game.map_height = height;

    createCanvas(width, height);
    rectMode(CENTER);

    game.buffer = createGraphics(game.map_width, game.map_height);
    const map = new MapGenerator(100, 1);
    map.draw(game.buffer);

    game.player = new Player(app.unit, app.unit);
    game.swarm.push(creatures.makeCreature({
        x: width - app.unit,
        y: height - app.unit,
        type: 'spider'
    }));
    game.swarm.push(creatures.makeCreature({
        x: app.unit,
        y: height - app.unit,
        type: 'wasp'
    }));
    game.swarm.push(creatures.makeCreature({
        x: width - app.unit,
        y: app.unit,
        type: 'hornet'
    }));
    game.swarm.push(creatures.makeCreature({
        x: width / 2,
        y: height / 2,
        type: 'scarab'
    }));
}

function draw() {
    if (width != container.clientWidth || height != container.clientHeight) {
        updateDimensions();
    }
    background(220);
    const { player, swarm } = game;
    image(game.buffer, 0, 0, width, height, game.map_pos_x, 0, width, height);

    if (player.life)
        player.draw();
    for (const creature of swarm)
        creature.draw();
    player.move();

    for (const creature of game.swarm)
        creature.move();


    for (let i = 0; i < game.player.bullets.length; i++) {
        const bullet = game.player.bullets[i];
        for (const creature of game.swarm) {
            const distance = dist(bullet.x, bullet.y, creature.x, creature.y) <= app.unit;
            if (distance <= app.unit) {
                const death = creature.hit();
                if (death) {
                    delete creature;
                    game.player.bullets.splice(i, 1);
                }
            }
        }
    }

    for (const creature of game.swarm) {
        for (let i = 0; i < creature.stings.length; i++) {
            const sting = creature.stings[i];
            const distance = dist(sting.x, sting.y, game.player.x, game.player.y);
            if (distance <= app.unit) {
                const death = game.player.hit();
                if (death) {
                    game.player.health = app.max_health;
                    game.player.life--;
                }
            }
        }
    }
}

function updateDimensions() {
    width = container.clientWidth;
    height = container.clientHeight;
    resizeCanvas(width, height);
}