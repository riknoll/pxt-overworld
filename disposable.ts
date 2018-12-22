namespace overworld {
    export interface Collection<U> {
        track(obj: U): void;
        remove(obj: U): void;
    }

    export interface Disposable {
        _owner?: Collection<Disposable>;
        dispose(): void;
        update(dt: number): void;
    }

    export class Service<U extends Disposable> implements Disposable, Collection<Disposable> {
        objects: U[];

        constructor() {
            this.objects = [];
        }

        track(obj: U): void {
            if (this.objects) {
                obj._owner = this;
                this.objects.push(obj);
            }
        }

        remove(obj: U): void {
            if (this.objects && obj._owner === this) {
                this.objects.removeElement(obj);
                obj._owner = undefined;
            }
        }

        dispose() {
            if (this.objects) {
                const all = this.objects;
                this.objects = null;

                for (const o of all) {
                    o.dispose();
                }
            }
        }

        update(dt: number) {
            if (this.objects) {
                for (const o of this.objects) {
                    o.update(dt);
                }
            }
        }
    }

    export class Subscriber implements Disposable {
        _owner: Service<Subscriber>;
        dead: boolean;

        constructor() {
        }

        update(dt: number) {
            // subclass
        }

        dispose() {
            if (this.dead) return;

            this.dead = true;
            if (this._owner) {
                this._owner.remove(this);
            }
        }
    }

    export class Timer extends Subscriber {
        period: number;
        millisRemaining: number;

        constructor(milliseconds: number) {
            super();
            this.millisRemaining = milliseconds;
        }

        update(dt: number) {
            this.millisRemaining -= dt;
            if (this.millisRemaining <= 0) {
                if (this.onTimerEnd()) {
                    this.dispose();
                }
            }
        }

        protected onTimerEnd(): boolean {
            // Subclass
            return true;
        }
    }
} 