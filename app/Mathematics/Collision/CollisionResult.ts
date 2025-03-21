import { BaseObject } from "../../Core/Core";
import ColliderObject from "./ColliderObject";

export default class CollisionResult {
    public collision: boolean;
    public top: boolean;
    public bottom: boolean;
    public left: boolean;
    public right: boolean;
    public colliders: ColliderObject[];
    public topColliders: ColliderObject[];
    public bottomColliders: ColliderObject[];
    public leftColliders: ColliderObject[];
    public rightColliders: ColliderObject[];

    public constructor(old?: CollisionResult) {
        if (old) {
            this.collision = old.collision;
            this.top = old.top;
            this.bottom = old.bottom;
            this.left = old.left;
            this.right = old.right;
            this.colliders = [...old.colliders];
            this.topColliders = [...old.topColliders];
            this.bottomColliders = [...old.bottomColliders];
            this.leftColliders = [...old.leftColliders];
            this.rightColliders = [...old.rightColliders];
        }
        else {
            this.collision = false;
            this.top = false;
            this.bottom = false;
            this.left = false;
            this.right = false;
            this.colliders = [];
            this.topColliders = [];
            this.bottomColliders = [];
            this.leftColliders = [];
            this.rightColliders = [];
        }
    }

    public Copy(): CollisionResult {
        return new CollisionResult(this);
    }

    public Invert(): void {
        let store: boolean = this.top;
        this.top = this.bottom;
        this.bottom = store;
        store = this.left;
        this.left = this.right;
        this.right = store;
        let storeArray: any[] = this.topColliders;
        this.topColliders = this.bottomColliders;
        this.bottomColliders = storeArray;
        storeArray = this.leftColliders;
        this.leftColliders = this.rightColliders;
        this.rightColliders = storeArray;
    }

    public SideCheck(other: CollisionResult): void {
        this.top = this.top && other.top;
        this.bottom = this.bottom && other.bottom;
        this.left = this.left && other.left;
        this.right = this.right && other.right;
    }

    public Combine(other: CollisionResult): void {
        this.collision = this.collision || other.collision;
        this.top = this.top || other.top;
        this.bottom = this.bottom || other.bottom;
        this.left = this.left || other.left;
        this.right = this.right || other.right;
        this.colliders = [...this.colliders, ...other.colliders];
        this.topColliders = [...this.topColliders, ...other.topColliders];
        this.bottomColliders = [...this.bottomColliders, ...other.bottomColliders];
        this.leftColliders = [...this.leftColliders, ...other.leftColliders];
        this.rightColliders = [...this.rightColliders, ...other.rightColliders];
    }
}
