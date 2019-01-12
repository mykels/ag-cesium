import {ViewerHolder} from '../viewer-holder';
import {PositionConverter} from '../../../utils/position/position-converter';
import {HomeConfig} from "../../../types/config/map/home-config";
import {Position} from "../../../types/position/position";

const DEFAULT_FLY_DURATION: number = 1;
const DEFAULT_ORIENTATION_PITCH_DEGREES: number = 90;

export class Camera {
    static zoomIn(zoomAmount?: number) {
        ViewerHolder.getViewer().subscribe((viewer: any) => {
            viewer.camera.zoomIn(zoomAmount);
        });
    }

    static zoomOut(zoomAmount?: number) {
        ViewerHolder.getViewer().subscribe((viewer: any) => {
            viewer.camera.zoomOut(zoomAmount);
        });
    }

    static flyHome(home: HomeConfig) {
        this.flyToDestination(home.destination, home.flyDuration, home.orientationPitchDegrees);
    }

    private static flyToDestination(destination: Position,
                                    flyDuration: number = DEFAULT_FLY_DURATION,
                                    orientationPitchDegrees: number = DEFAULT_ORIENTATION_PITCH_DEGREES): void {
        ViewerHolder.getViewer().subscribe((viewer: any) => {
            viewer.camera.flyTo({
                destination: PositionConverter.degreesToCartesian(destination),
                duration: flyDuration,
                orientation: {
                    pitch: Cesium.Math.toRadians(orientationPitchDegrees)
                }
            });
        });
    }
}
