import {HomeConfig} from './home-config';
import {ZoomConfig} from './zoom-config';
import {ViewerOptions} from './viewer-options';
import {SceneConfig} from './scene-config';
import {TuningConfig} from './tuning-config';
import {Raster} from "../raster/raster";

export interface MapConfig {
  viewerOptions: ViewerOptions;
  scene: SceneConfig;
  home: HomeConfig;
  zoom: ZoomConfig;
  tuning: TuningConfig;
  rasters: Raster[];
}
