import {AbstractGraphicRenderer} from '../../types/graphic-renderer/abstract-graphic-renderer';
import {BillboardDescription} from '../../types/entitities/egd/billboard-description/billboard-description';

export class BillboardRenderer extends AbstractGraphicRenderer<BillboardDescription> {
  private static readonly INSTANCE: BillboardRenderer = new BillboardRenderer();

  static getInstance() {
    return BillboardRenderer.INSTANCE;
  }

  protected createCollection(): any {
    return new Cesium.BillboardCollection({
      blendOption: Cesium.BlendOption.OPAQUE
    });
  }

  protected handleUpdates(billboardDescription: BillboardDescription, billboardGraphic: any): void {
    billboardGraphic.position = billboardDescription.position;
    billboardGraphic.image = billboardDescription.image;
    billboardGraphic.rotation = billboardGraphic.rotation ? billboardDescription.rotation : 0;
    billboardGraphic.color = billboardDescription.color;
    billboardGraphic.show = billboardDescription.show;
  }

}
