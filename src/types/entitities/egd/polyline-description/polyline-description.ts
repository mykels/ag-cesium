import {Cartesian3} from '../../../cartesian/cartesian3';
import {PrimitiveDescription} from '../primitive-description';

export interface PolylineDescription extends PrimitiveDescription {
    positions: Cartesian3[];
    material: any;
    width?: number;
    distanceDisplayCondition?: any;
}
