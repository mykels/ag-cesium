import {of} from 'rxjs';
import {Diff, EGD, EntityGraphic, ID, PrimitiveGraphics} from '../..';
import {ViewerHolder} from '../../map/viewer/viewer-holder';
import {PrimitiveDescription} from '../../types/entitities/egd/primitive-description';
import {GraphicRenderer} from '../../types/graphic-renderer/graphic-renderer';
import {DiffCalculator} from '../../utils/diff/diff-calculator.service';
import {BillboardRenderer} from '../billboard/billboard-renderer.service';
import {LabelRenderer} from '../label/label.renderer';
import {PointRenderer} from '../point/point-renderer';
import {PolylineRenderer} from '../polyline/polyline-renderer';

/**
 * Handles main rendering pipeline.
 *
 * Supports both rendering of an array of EGDs and rendering of a specific EGD diff.
 */
export class EntityRenderer {
    private static previousEntities: EGD[];
    private static entityGraphics: Map<ID, EntityGraphic> = new Map<ID, EntityGraphic>();

    /**
     * Renders an egd array on the map.
     *
     * Performs differentiation of the current state against the previous state
     * in order to perform the minimal set of CesiumJS API operations to bring
     * the previous state to the desired state.
     *
     * Note that there is no need for sending a new reference on each render cycle,
     * the differentiation algorithm is comparing the entities by the ID. Having said
     * that, everything will work just fine in case you will.
     *
     * Note that every EGD primitive (i.e billboard, label etc) should have it's *unique*
     * ID (which by convention is preferable to be assembled using the entity id and the primitive intent)
     *
     * @param egds - desired entity graphic descriptions to be rendered, represents the *current state*
     */
    public static render(egds: EGD[]): void {
        ViewerHolder.getViewer().subscribe((viewer: any) => {
            const diff: Diff<EGD> = EntityRenderer.calculateDiff(egds);
            EntityRenderer.renderDiff(diff, viewer);
        });
    }

    /**
     * Renders an egd diff on the map.
     *
     * Performs iteration of all diffs and renders the current state to match the
     * given diffs.
     *
     * Note that there is no need for sending a new reference on each render cycle,
     * the differentiation algorithm is comparing the entities by the ID. Having said
     * that, everything will work just fine in case you will.
     *
     * Note that every EGD primitive (i.e billboard, label etc) should have it's *unique*
     * ID (which by convention is preferable to be assembled using the entity id and the primitive intent)
     *
     * @param diff - EGD diff object
     * @param viewer - an optional viewer, in case it is not supplied it is fetched from ViewerHolder
     */
    public static renderDiff(diff: Diff<EGD>, viewer?: any): void {
        EntityRenderer.getViewer(viewer).subscribe((cachedViewer: any) => {
            EntityRenderer.renderEntities(cachedViewer, diff.updated || [], diff.removed || []);
        });
    }

    private static getViewer(viewer?: any): Observable<any> {
        return viewer ? of(viewer) : ViewerHolder.getViewer();
    }

    private static renderEntities(viewer: any, updated: EGD[], removed: EGD[]) {
        EntityRenderer.freezeRendering(viewer);
        EntityRenderer.renderUpdates(updated);
        EntityRenderer.renderRemoves(removed);
        EntityRenderer.resumeRendering(viewer);
    }

    private static freezeRendering(viewer: any): void {
        viewer.entities.suspendEvents();
    }

    private static renderUpdates(updatedEgds: EGD[]): void {
        updatedEgds.forEach((updatedEgd: EGD) => {
            const updatedEntityGraphic: EntityGraphic = EntityRenderer.getEntityGraphic(updatedEgd.id);

            EntityRenderer.updatePrimitiveDescriptions(updatedEgd.billboards, BillboardRenderer.getInstance(), updatedEntityGraphic.billboardGraphics);
            EntityRenderer.updatePrimitiveDescriptions(updatedEgd.labels, LabelRenderer.getInstance(), updatedEntityGraphic.labelGraphics);
            EntityRenderer.updatePrimitiveDescriptions(updatedEgd.polylines, PolylineRenderer.getInstance(), updatedEntityGraphic.polylineGraphics);
            EntityRenderer.updatePrimitiveDescriptions(updatedEgd.points, PointRenderer.getInstance(), updatedEntityGraphic.pointGraphics);

            EntityRenderer.entityGraphics.set(updatedEntityGraphic.id, updatedEntityGraphic);
        });
    }

    private static updatePrimitiveDescriptions<T extends PrimitiveDescription>(primitiveDescription: T[],
                                                                               graphicRenderer: GraphicRenderer<T>,
                                                                               primitiveGraphics: PrimitiveGraphics): void {
        if (primitiveDescription) {
            graphicRenderer.update(primitiveDescription, primitiveGraphics);
        }
    }

    private static renderRemoves(removedEgds: EGD[]): void {
        removedEgds.forEach((removedEgd: EGD) => {
            const updatedEntityGraphic: EntityGraphic = EntityRenderer.entityGraphics.get(removedEgd.id);

            BillboardRenderer.getInstance().remove(updatedEntityGraphic.billboardGraphics);
            LabelRenderer.getInstance().remove(updatedEntityGraphic.labelGraphics);
            PolylineRenderer.getInstance().remove(updatedEntityGraphic.polylineGraphics);
            PointRenderer.getInstance().remove(updatedEntityGraphic.pointGraphics);
        });
    }

    private static resumeRendering(viewer: any): void {
        viewer.entities.resumeEvents();
        viewer.scene.requestRender();
    }

    private static getEntityGraphic(id: ID): EntityGraphic {
        return EntityRenderer.entityGraphics.has(id) ? EntityRenderer.entityGraphics.get(id) : new EntityGraphic(id);
    }

    private static calculateDiff(egds: EGD[]) {
        const diff: Diff<EGD> = DiffCalculator.calculate(egds, EntityRenderer.previousEntities);
        EntityRenderer.previousEntities = egds;
        return diff;
    }
}
