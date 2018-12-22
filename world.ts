namespace overworld {
    /**
     * Represents the current state of the game. Note that this is distinct from
     * SaveState, which represents the state of the "story"
     */
    export class World {
        characters: Character[];
        map: Map;

        movementEvents: Event[];
        interactionEvents: Event[];

        loadStage(stage: Stage) {
            this.map = stage.map;
        }
    }
} 