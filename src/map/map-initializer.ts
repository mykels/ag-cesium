import {MapConfig} from "..";
import {SceneInitializer} from './scene/scene-initializer';
import {ViewerInitializer} from './viewer/viewer-initializer';

export class MapInitializer {
    static init(mapConfig: MapConfig, container: string) {
        ViewerInitializer.init(mapConfig.viewerOptions, container);
        SceneInitializer.init(mapConfig.scene, mapConfig.zoom, mapConfig.home);
    }
}
