import {IPoint} from "./IPoint";

export interface IFilterResponse {
    setRadius: React.Dispatch<React.SetStateAction<number | undefined>>;
    radius: number | undefined;
    setPoint: React.Dispatch<React.SetStateAction<IPoint | null>>;
    point: IPoint | null;
    setCoordinates: React.Dispatch<React.SetStateAction<[number, number][] | undefined>>;
    coordinates: [number, number][] | undefined;
}
