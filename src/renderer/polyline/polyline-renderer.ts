import {GraphicRenderer} from '../../types/graphic-renderer/graphic-renderer';
import {PolylineDescription} from '../../types/entitities/egd/polyline-description/polyline-description';
import {PrimitiveGraphics} from '../../types/entitities/entity-graphic/primitive-graphics';

export class PolylineRenderer implements GraphicRenderer<PolylineDescription> {
  private static readonly INSTANCE: PolylineRenderer = new PolylineRenderer();
  private entityCollection: any;

  static getInstance() {
    return PolylineRenderer.INSTANCE;
  }

  remove(polylineGraphics: PrimitiveGraphics): void {
    polylineGraphics.forEach(this.handleRemove.bind(this));
  }

  update(polylineDescriptions: PolylineDescription[], polylineGraphics: PrimitiveGraphics): void {
    polylineDescriptions.forEach((polylineDescription: PolylineDescription) => {
      if (polylineGraphics.has(polylineDescription.id)) {
        const polylineGraphic: any = polylineGraphics.get(polylineDescription.id);
        this.handleUpdates(polylineDescription, polylineGraphic);
      } else {
        this.handleAdditions(polylineDescription, polylineGraphics);
      }
    });
  }

  private handleRemove(polylineGraphic: any) {
    this.entityCollection.remove(polylineGraphic);
  }

  private handleUpdates(polylineDescription: PolylineDescription, polylineGraphic: any): void {
    polylineGraphic.polyline.positions = polylineDescription.positions;
    polylineGraphic.polyline.show = polylineDescription.show;
  }

  private handleAdditions(polylineDescription: PolylineDescription, polylineGraphics: PrimitiveGraphics): void {
    const polylineGraphic: any = this.entityCollection.add({
      id: polylineDescription.id,
      polyline: polylineDescription
    });

    polylineGraphics.set(polylineDescription.id, polylineGraphic);
  }
}
