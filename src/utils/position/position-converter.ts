import {Cartesian3} from '../../types/cartesian/cartesian3';
import {Position} from '../../types/position/position';

export class PositionConverter {
  static degreesToCartesian(position: Position): Cartesian3 {
    return Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.altitude ? position.altitude : 0);
  }
}
