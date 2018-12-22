
namespace overworld {
    /**
     * Represents an action that can be conditionally triggered to
     * change the World or SaveState.
     * 
     * For example, an Event could be:
     *     - A conversation with an NPC
     *     - A treasure chest giving a character an item
     *     - A doorway loading a new Map into the world
     *     - A button unlocking a gate
     *     - A sign causing some text to appear on the screen
     */
    export interface Event {
        precondition: EventPrecondition;
        trigger: EventTrigger;
        action: EventAction;
    }

    /**
     * The action that an Event will perform when triggered. Usually
     * has side effects.
     */
    export interface EventAction {
        /**
         * The action that affects the Character/SaveState/World once the
         * event is triggered.
         * 
         * @param target The character that triggered the Event (e.g. the player)
         * @param state The current state of the "story"
         * @param world The current state of the game
         */
        doAction(target: Character, state: SaveState, world: World): void;
    }

    /**
     * Decides if an Event will load in a Map.
     */
    export interface EventPrecondition {
        /**
         * Called when a Map is loaded to determine whether this event will
         * be loaded.
         * 
         * @param state The current state of the "story"
         * 
         * @return True if the Event should load, false if it should not
         */
        check(state: SaveState): boolean;
    }

    /**
     * Decides when an Event will be fired for a character.
     */
    export interface EventTrigger {
        /**
         * Checks whether or not an event should trigger. Should not have
         * side effects.
         * 
         * @param target The character attempting to trigger the Event (e.g. the player)
         * @param state The current state of the "story"
         * @param world The current state of the game
         * 
         * @return True if the Event should trigger, false if it should not
         */
        check(target: Character, state: SaveState, world: World): boolean;
    }
}