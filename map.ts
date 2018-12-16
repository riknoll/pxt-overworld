namespace overworld {
    const TILE_BYTES = 2;
    
    /**
     * A tile map
     */
    export class Map {
        width: number;
        height: number;
        data: Buffer;

        constructor(width: number, height: number, data: Buffer) {
            this.width = width;
            this.height = height;
            this.data = data;
        }

        /**
         * Get data for the supplied location
         * 
         * @param col The column of a location in the Map
         * @param row The row of a location in the Map
         */
        getTile(col: number, row: number) {
            if (col >= this.width || row >= this.height || col < 0 || row < 0) return undefined;

            return new Tile(this, (col + row * this.width) * TILE_BYTES);
        }
    }

    /**
     * Represents a location in a Map
     */
    export class Tile {
        private offset: number;
        private source: Map;

        constructor(source: Map, offset: number) {
            this.offset = offset;
            this.source = source;
        }

        /**
         * The column of this tile in the Map
         */
        get column(): number {
            return Math.idiv(this.offset, TILE_BYTES) % this.source.width;
        }

        /**
         * The row of this tile in the Map
         */
        get row(): number {
            return Math.idiv(Math.idiv(this.offset, TILE_BYTES), this.source.width);
        }

        /**
         * The flags for this tile
         */
        get flags(): number {
            return this.source.data.getNumber(NumberFormat.Int8LE, this.offset)
        }

        /**
         * The image ID for this tile
         */
        get tile(): number {
            return this.source.data.getNumber(NumberFormat.Int8LE, this.offset + 1);
        }
    }
}