import {PrimitiveDescription} from '../primitive-description';

export interface LabelDescription extends PrimitiveDescription {
    text: string;
    font?: string;
    fillColor?: any;
    outlineColor?: any;
    outlineWidth?: number;
    style?: any;
    horizontalOrigin?: any;
}
