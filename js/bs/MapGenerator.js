class MapGenerator {
    constructor(granularity, seed, tileSize = app.unit) {
        noiseSeed(seed);
        this.granularity = granularity;
        this.tileSize = tileSize;
    }

    drawBuffer(i, j) {
        const { buffer } = game;
        const { tiles } = images;
        const val = noise(i / this.granularity, j / this.granularity);
        /**
         * Image Parameters:
         * 1: The source image
         * 2&3: top-left corner of destination section (i, j)
         * 4&5: size of destination section (l, w)
         * 6&7: top-left corner of source section (i, j)
         * 8&9: size of source section (l, w)
         */
        if (val < .2) {
            buffer.image(tiles, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize, 0, 0, 16, 16);
        }
        else if (val < .35) {
            buffer.image(tiles, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize, 16, 0, 16, 16);
        }
        else if (val < .5) {
            buffer.image(tiles, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize, 0, 16, 16, 16);
        }
        else if (val < .65) {
            buffer.image(tiles, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize, 16, 16, 16, 16);
        }
        else if (val < .8) {
            buffer.image(tiles, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize, 0, 32, 16, 16);
        }
        else {
            buffer.image(tiles, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize, 16, 32, 16, 16);
        }
    }

    draw() {
        noStroke();
        const { tiles } = images;
        for (let i = 0; i < game.map_height / this.tileSize; i++) {
            for (let j = 0; j < game.map_width / this.tileSize; j++) {
                this.drawBuffer(i, j);
            }
        }
    }
}