import {AbstractGraphicRenderer} from '../../types/graphic-renderer/abstract-graphic-renderer';
import {LabelDescription} from '../../types/entitities/egd/label-description/label-description';

export class LabelRenderer extends AbstractGraphicRenderer<LabelDescription> {
  private static readonly INSTANCE: LabelRenderer = new LabelRenderer();

  static getInstance() {
    return LabelRenderer.INSTANCE;
  }

  protected createCollection(): any {
    return new Cesium.LabelCollection({
      blendOption: Cesium.BlendOption.TRANSLUCENT
    });
  }

  protected handleUpdates(labelDescription: LabelDescription, labelGraphic: any): void {
    labelGraphic.position = labelDescription.position;
    labelGraphic.show = labelDescription.show;
  }
}
