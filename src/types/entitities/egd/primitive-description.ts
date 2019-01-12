import {Cartesian2, Cartesian3, ID} from "../../..";

export interface PrimitiveDescription {
    id: ID;
    show?: boolean;
    position?: Cartesian3;
    color?: any;
    pixelOffset?: Cartesian2;
}
