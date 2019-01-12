import {ViewerHolder} from '../viewer/viewer-holder';
import {ColorConverter} from '../../utils/color/color-converter';
import {ZoomConfigurator} from './zoom/zoom-configurator';
import {SceneConfig} from "../../types/config/map/scene-config";
import {ZoomConfig} from "../../types/config/map/zoom-config";
import {HomeConfig} from "../../types/config/map/home-config";

export class SceneInitializer {
  static init(sceneConfig: SceneConfig, zoomConfig: ZoomConfig, homeConfig: HomeConfig) {
    ViewerHolder.getScene().subscribe((scene: any) => {
      scene.mode = sceneConfig.mode;
      scene.globe.baseColor = ColorConverter.convert(sceneConfig.globe.baseColor);

      ZoomConfigurator.configure(zoomConfig, homeConfig);
    });
  }
}
