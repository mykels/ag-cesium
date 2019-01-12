import { Raster } from '..';
import { ViewerHolder } from '../map/viewer/viewer-holder';

export class RasterLoader {
  private static providerMap: Map<string, (options: any) => any> = RasterLoader.initProviderMap();

  static loadRasters(rasters: Raster[]): void {
    rasters.map((raster: Raster) => this.createImageryProvider(raster))
    .filter((imageryProvider: any) => !!imageryProvider)
    .forEach((imageryProvider: any) => {
      ViewerHolder.getViewer().subscribe((viewer: any) => {
        viewer.imageryLayers.addImageryProvider(imageryProvider);
      });
    });
  }

  static createImageryProvider(raster: Raster): any {
    const provider = RasterLoader.providerMap.get(raster.provider);

    return provider ? provider(raster.options) : undefined;
  }

  private static initProviderMap() {
    const providerMap: Map<string, (options: any) => any> = new Map<string, (options: any) => any>();
    providerMap.set('url', (options) => new Cesium.UrlTemplateImageryProvider(options));
    providerMap.set('wms', (options) => new Cesium.WebMapServiceImageryProvider(options));
    return providerMap;
  }
}
