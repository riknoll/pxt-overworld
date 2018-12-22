namespace overworld {
    /**
     * An EventAction that executes multiple EventActions in sequece.
     */
    export class EventSequence implements EventAction {
        actions: EventAction[];

        constructor(actions?: EventAction[]) {
            this.actions = actions || [];
        }

        push(action: EventAction) {
            this.actions.push(action);
        }

        doAction(target: Character, state: SaveState, world: World) {
            for (const a of this.actions) {
                a.doAction(target, state, world);
            }
        }
    }
}