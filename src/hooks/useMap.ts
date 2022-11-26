import {useAppContext} from "../providers/app-provider";
import {IAdvertisement} from "../models/IAdvertisement";
import {useFilterContext} from "../providers/filter-provider";
import {MAP_BOX_TOKEN} from "../constants";
import {point as pointer} from "@turf/helpers";
import {buffer} from "@turf/turf";
import {MapEvent} from "react-map-gl";
import {useCallback, useEffect, useState} from "react";

export const useMap = (adverts: IAdvertisement[]) => {
    const {selected} = useAppContext<IAdvertisement>();
    const {radius, point, setPoint, setCoordinates} = useFilterContext();
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [circle, setCircle] = useState<any>(null);
    const [zoom, setZoom] = useState(11);

    const [viewport, setViewport] = useState({
        longitude: lng,
        latitude: lat,
        zoom: zoom,
        pitch: 0,
        bearing: 0,
        mapboxApiAccessToken: MAP_BOX_TOKEN
    });

    useEffect(() => {
        if(circle) {
            setCoordinates(circle.geometry?.coordinates?.[0] ?? [])
        }
    }, [circle])

    useEffect(() => {
        if (point) {
            const turfPoint = pointer([point?.lng ?? 0, point?.lat ?? 0]);
            setCircle(buffer(turfPoint, radius, {units: 'kilometers'}));
        }
    }, [point, radius])

    useEffect(() => {
        if (selected) {
            setViewport({
                ...viewport,
                longitude: selected?.position?.lng ?? 0,
                latitude: selected?.position?.lat ?? 0,
            })
        }
    }, [selected]) 

    useEffect(() => {
        if (selected) {
            setViewport({
                ...viewport,
                longitude: selected?.position?.lng ?? 0,
                latitude: selected?.position?.lat ?? 0,
            })
        } else if (adverts) {
            setViewport({
                ...viewport,
                longitude: (adverts?.[0]?.position?.lng ?? 0),
                latitude: (adverts?.[0]?.position?.lat ?? 0),
            })
        }
    }, [adverts])

    const mapClickHandler = useCallback((e: MapEvent) => {
        if (e) {
            setPoint({
                lat: e?.lngLat[1],
                lng: e?.lngLat[0]
            })
        }
    }, [setPoint])

    return {
        mapClickHandler,
        viewport,
        setViewport,
        point,
        setPoint,
        circle,
        setCircle
    }
}
