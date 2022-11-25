import {IFilterResponse} from "../models/IFilterResponse";
import {IPoint} from "../models/IPoint";
import {useEffect, useState} from "react";
import {IAdvertisement} from "../models/IAdvertisement";
import {areCoordinatesAreInside} from "../helpers";

/**
 * Hook to manage filters changes
 * @param adverts
 * @param setAdverts
 */
export const useFilter = (adverts: Partial<IAdvertisement>[],
                          setAdverts: React.Dispatch<React.SetStateAction<Partial<IAdvertisement>[]>>): IFilterResponse => {
    const [coordinates, setCoordinates] = useState<[number, number][]>();
    const [radius, setRadius] = useState<number | undefined>(1);
    const [point, setPoint] = useState<IPoint | null>(null);

    useEffect(() => {
        if (radius && adverts && point) {
            const list: Partial<IAdvertisement>[] = adverts?.filter(elt => {
                return (coordinates ?? [])?.some(item => {
                    return areCoordinatesAreInside(elt?.position ?? {lng: 0, lat: 0}, {lng: item[0], lat: item[1]}, radius);
                })
            }) ?? []
            setAdverts(list);
        } else {
            setAdverts(adverts)
        }
    }, [radius, point, coordinates])

    return {
        coordinates,
        setCoordinates,
        radius,
        setPoint,
        point,
        setRadius
    }
}
