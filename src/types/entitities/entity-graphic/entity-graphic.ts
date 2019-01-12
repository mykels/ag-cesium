import {ID} from "../../..";
import {PrimitiveGraphics} from './primitive-graphics';

/**
 * EntityGraphic represents the low-level graphic representation of the entity.
 */
export class EntityGraphic {
    id: ID;
    billboardGraphics?: PrimitiveGraphics;
    labelGraphics?: PrimitiveGraphics;
    polylineGraphics?: PrimitiveGraphics;
    pointGraphics?: PrimitiveGraphics;

    constructor(id: ID) {
        this.id = id;
        this.billboardGraphics = new Map<ID, any>();
        this.labelGraphics = new Map<ID, any>();
        this.polylineGraphics = new Map<ID, any>();
        this.pointGraphics = new Map<ID, any>();
    }

}
