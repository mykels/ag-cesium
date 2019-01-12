import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export class ViewerHolder {
    private static viewer$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

    static init(viewer: any) {
        ViewerHolder.viewer$.next(viewer);
    }

    static getViewer(): Observable<any> {
        return ViewerHolder.viewer$.pipe(filter((viewer: any) => !!viewer));
    }

    static getScene(): Observable<any> {
        return this.getViewer().pipe(map((viewer: any) => viewer.scene));
    }
}
