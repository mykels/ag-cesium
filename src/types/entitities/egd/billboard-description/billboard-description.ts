import {Cartesian2} from '../../../cartesian/cartesian2';
import {PrimitiveDescription} from '../primitive-description';

export interface BillboardDescription extends PrimitiveDescription {
    image: string;
    rotation?: number;
    scale?: number;
    width?: number;
    height?: number;
    pixelOffset?: Cartesian2;
}
