namespace overworld {
    /**
     * An EventTrigger that chains multiple EventTriggers together.
     */
    export class MultiTrigger implements EventTrigger {
        triggers: EventTrigger[];

        constructor(triggers?: EventTrigger[]) {
            this.triggers = triggers || [];
        }

        push(trigger: EventTrigger) {
            this.triggers.push(trigger);
        }

        check(target: Character, state: SaveState, world: World) {
            for (const tr of this.triggers) {
                if (!tr.check(target, state, world)) return false;
            }
            return true;
        }
    }

    /**
     * An EventTrigger that checks if a character is within an area of tiles.
     */
    export class AreaTrigger implements EventTrigger {
        row0: number;
        col0: number;

        row1: number;
        col1: number;

        direction: FourDirection | EightDirection | 0;

        constructor(r0: number, c0: number, r1: number, c1: number, direction = 0) {
            this.row0 = Math.min(r0, r1);
            this.row1 = Math.max(r0, r1);
            this.col0 = Math.min(c0, c1);
            this.col1 = Math.max(c0, c1);
            this.direction = direction;
        }

        check(target: Character, state: SaveState, world: World) {
            const loc = target.location;

            return loc.column >= this.col0 && loc.column <= this.col1 &&
                loc.row >= this.row0 && loc.row <= this.row1 && 
                (this.direction == 0 || this.direction == target.facing);
        }
    }

    /**
     * An EventTrigger that checks if a character is at a location
     */
    export class LocationTrigger implements EventTrigger {
        row: number;
        column: number;

        direction: FourDirection | EightDirection | 0;

        constructor(row: number, column: number, direction = 0) {
            this.row = row;
            this.column = column;
            this.direction = direction;
        }

        check(target: Character, state: SaveState, world: World) {
            return target.location.column == this.column && target.location.row == this.row &&
                (this.direction == 0 || this.direction == target.facing);
        }
    }
} 