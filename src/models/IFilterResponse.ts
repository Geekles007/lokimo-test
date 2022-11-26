import {IPoint} from "./IPoint";

export interface IFilterResponse {
    setRadius: (value: number) => void;
    radius: number | undefined;
    setPoint: (point: IPoint | null) => void;
    point: IPoint | null;
    setCoordinates: (value: [number, number][]) => void;
    coordinates: [number, number][] | undefined;
}
