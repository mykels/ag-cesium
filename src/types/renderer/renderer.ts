import {Diff} from '../diff/diff';
import {EGD} from '../entitities/egd/egd';

export interface Renderer {
    /**
     * TODO: add documentation
     * @param diff
     */
    render(diff: Diff<EGD>): void;
}
