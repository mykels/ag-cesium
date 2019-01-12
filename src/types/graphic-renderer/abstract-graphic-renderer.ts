import {GraphicRenderer} from './graphic-renderer';
import {PrimitiveDescription} from '../entitities/egd/primitive-description';
import {PrimitiveGraphics} from '../entitities/entity-graphic/primitive-graphics';
import {ViewerHolder} from '../../map/viewer/viewer-holder';

export abstract class AbstractGraphicRenderer<T extends PrimitiveDescription> implements GraphicRenderer<T> {
    private readonly primitiveCollection: any;

    protected constructor() {
        this.primitiveCollection = this.createCollection();
        ViewerHolder.getScene().subscribe((scene: any) => {
            scene.primitives.add(this.primitiveCollection);
        });
    }

    update(primitiveDescriptions: T[], primitiveGraphics: PrimitiveGraphics): void {
        primitiveDescriptions.forEach((primitiveDescription: T) => {
            if (primitiveGraphics.has(primitiveDescription.id)) {
                const primitiveGraphic: any = primitiveGraphics.get(primitiveDescription.id);
                this.handleUpdates(primitiveDescription, primitiveGraphic);
            } else {
                this.handleAdditions(primitiveDescription, primitiveGraphics);
            }
        });

        this.handleRemoves(primitiveDescriptions, primitiveGraphics);
    }

    remove(primitiveGraphics: PrimitiveGraphics): void {
        primitiveGraphics.forEach(this.handleRemove.bind(this));
    }

    protected abstract createCollection(): any;

    protected abstract handleUpdates(primitiveDescription: T, primitiveGraphic: any): void;

    private handleAdditions(primitiveDescription: T, primitiveGraphics: PrimitiveGraphics): void {
        const primitiveGraphic: any = this.primitiveCollection.add(primitiveDescription);
        primitiveGraphics.set(primitiveDescription.id, primitiveGraphic);
    }

    private handleRemoves(primitiveDescriptions: T[], primitiveGraphics: PrimitiveGraphics) {
        primitiveGraphics.forEach((primitiveGraphic: any) => {
            if (this.isRemoved(primitiveDescriptions, primitiveGraphic.id)) {
                this.handleRemove(primitiveGraphic);
                primitiveGraphics.delete(primitiveGraphic.id);
            }
        });
    }

    private isRemoved(primitiveDescriptions: any[], primitiveGraphicToFind: any): boolean {
        for (let primitiveDescription of primitiveDescriptions) {
            if (primitiveDescription.id === primitiveGraphicToFind.id) {
                return true;
            }
        }

        return false;
    }

    private handleRemove(primitiveGraphic: any) {
        this.primitiveCollection.remove(primitiveGraphic);
    }
}
