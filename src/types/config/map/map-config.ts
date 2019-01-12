import {EventsConfig, HomeConfig, ProfilingConfig, Raster} from "../../..";
import {SceneConfig} from './scene-config';
import {TuningConfig} from './tuning-config';
import {ViewerOptions} from './viewer-options';
import {ZoomConfig} from './zoom-config';

export interface MapConfig {
    viewerOptions: ViewerOptions;
    scene: SceneConfig;
    home: HomeConfig;
    zoom: ZoomConfig;
    tuning: TuningConfig;
    rasters: Raster[];
    profiling: ProfilingConfig;
    events: EventsConfig;
}
