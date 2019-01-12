import {PrimitiveDescription} from '../primitive-description';

export interface PointDescription extends PrimitiveDescription {
    outlineColor?: any;
    outlineWidth?: number;
    pixelSize?: number;
}
