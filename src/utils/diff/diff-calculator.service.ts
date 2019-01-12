/*****************
 * a = [1,2,3,4]
 * b = [2,3,4,5]
 * diff(a,b)= {
 *  removed: [1],
 *  added: [5],
 *  updated: [2,3,4]
 * }
 ****************/
import {Diff, Entity, ID} from "../..";

export class DiffCalculator {
    public static calculate<T>(currentEntities: Entity[], previousEntities: Entity[]): Diff<T> {
        const diff: Diff<any> = {removed: [], updated: []};

        if (!currentEntities || !previousEntities) {
            diff.updated = previousEntities || currentEntities;
            return diff;
        }

        const currentEntitiesMap: Map<ID, Entity> = DiffCalculator.populateMap(currentEntities);

        previousEntities.forEach((previousEntity: Entity) => {
            if (!currentEntitiesMap.has(previousEntity.id)) {
                diff.removed.push(previousEntity);
            }
        });

        diff.updated = currentEntities;

        return diff;
    }

    private static populateMap(entities: Entity[]): Map<ID, Entity> {
        const entityMap: Map<ID, Entity> = new Map<ID, Entity>();
        entities.forEach((entity: Entity) => entityMap.set(entity.id, entity));
        return entityMap;
    }
}
