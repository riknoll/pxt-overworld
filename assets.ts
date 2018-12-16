namespace overworld {
    /**
     * A collection of game image assets
     */
    export class ImageSet {
        images: Image[];

        constructor(images: Image[]) {
            this.images = images;
        }

        getImage(index: number) {
            return this.images[index];
        }
    }

    /**
     * Represents a location asset in the game. This is different
     * from World, which represents the game state after a Stage
     * has been loaded.
     * 
     * For example:
     *    - A town
     *    - The inside of a shop
     *    - A floor in a dungeon
     */
    export class Stage {
        map: Map;
        tileset: ImageSet;
        events: Event[];
    }
}
