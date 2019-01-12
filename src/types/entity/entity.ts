import {ID} from "./id";

export interface Entity {
    id: ID;

    [property: string]: any;
}
