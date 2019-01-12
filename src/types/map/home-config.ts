import {Position} from '../position/position';

export interface HomeConfig {
    destination: Position;
    flyDuration: number;
    orientationPitchDegrees: number;
}
