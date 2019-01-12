import {RasterLoader, ViewerOptions} from "../..";
import {ViewerHolder} from './viewer-holder';

const DEFAULT_MAP_ID: string = 'main-map';

export class ViewerInitializer {
    static init(viewerOptions: ViewerOptions, container: string = DEFAULT_MAP_ID) {
        ViewerHolder.init(new Cesium.Viewer(container, this.getViewerOptions(viewerOptions)));
    }

    private static getViewerOptions(viewerOptions: ViewerOptions): ViewerOptions {
        viewerOptions.imageryProvider = RasterLoader.createImageryProvider(viewerOptions.imageryProvider);

        return viewerOptions;
    }
}
