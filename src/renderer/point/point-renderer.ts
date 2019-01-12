import {AbstractGraphicRenderer} from '../../types/graphic-renderer/abstract-graphic-renderer';
import {PointDescription} from '../../types/entitities/egd/point-description/point-description';

export class PointRenderer extends AbstractGraphicRenderer<PointDescription> {
  private static readonly INSTANCE: PointRenderer = new PointRenderer();

  static getInstance() {
    return PointRenderer.INSTANCE;
  }

  protected createCollection(): any {
    return new Cesium.PointPrimitiveCollection({
      blendOption: Cesium.BlendOption.OPAQUE
    });
  }

  protected handleUpdates(pointDescription: PointDescription, pointGraphic: any): void {
    pointGraphic.position = pointDescription.position;
    pointGraphic.show = pointDescription.show;
  }

}
