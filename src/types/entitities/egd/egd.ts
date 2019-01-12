import {ID} from "../../..";
import {BillboardDescription} from './billboard-description/billboard-description';
import {LabelDescription} from './label-description/label-description';
import {PointDescription} from './point-description/point-description';
import {PolylineDescription} from './polyline-description/polyline-description';

/**
 * EGD is short for Entity Graphic Description
 * Represents the description from which the graphic entity will be built.
 */
export interface EGD {
    id: ID;
    billboards?: BillboardDescription[];
    labels?: LabelDescription[];
    polylines?: PolylineDescription[];
    points?: PointDescription[];
    show?: boolean;
}
