namespace overworld {
    export enum EightDirection {
        North = 1,
        East = 2,
        West = 3,
        South = 4,
        NorthEast = 5,
        SouthWest = 6,
        NorthWest = 8,
        SouthEast = 9
    }

    export enum FourDirection {
        North = EightDirection.North,
        East = EightDirection.East,
        West = EightDirection.West,
        South = EightDirection.South
    }

    /**
     * Represents a "character" in the World. This could be the player,
     * an AI controlled NPC, etc.
     */
    export class Character {
        /**
         * The Tile in the Map that currently contains this Character
         */
        location: Tile;

        /**
         * The Sprite that is drawn for this Character.
         */
        sprite: Sprite;

        /**
         * The direction the character is facing
         */
        facing: FourDirection | EightDirection;
    }
}