import {ViewerHolder} from '../../viewer/viewer-holder';
import {Camera} from '../../viewer/camera/camera';
import {ZoomConfig} from "../../../types/config/map/zoom-config";
import {HomeConfig} from "../../../types/config/map/home-config";

export class ZoomConfigurator {
    static configure(zoomConfig: ZoomConfig, home: HomeConfig) {
        ViewerHolder.getScene().subscribe((scene: any) => {
            scene.screenSpaceCameraController.minimumZoomDistance = zoomConfig.min;
            scene.screenSpaceCameraController.maximumZoomDistance = zoomConfig.max;
            scene.screenSpaceCameraController.inertiaZoom = zoomConfig.inertia;

            Camera.flyHome(home);
        });
    }
}
