import {PrimitiveGraphics} from '../entitities/entity-graphic/primitive-graphics';
import {PrimitiveDescription} from '../entitities/egd/primitive-description';

export interface GraphicRenderer<T extends PrimitiveDescription> {
    /**
     * TODO: add doc
     * @param primitiveDescriptions
     * @param primitiveGraphics
     */
    update(primitiveDescriptions: T[], primitiveGraphics: PrimitiveGraphics): void;

    /**
     * TODO: add doc
     * @param primitiveGraphics
     */
    remove(primitiveGraphics: PrimitiveGraphics): void;
}
