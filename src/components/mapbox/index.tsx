import React, {createRef, memo, useCallback, useEffect, useState} from "react";
import {MAP_BOX_TOKEN} from "../../constants";
import ReactMapGL, {FullscreenControl, Layer, MapEvent, Marker, NavigationControl, Source} from "react-map-gl";
import {useAppContext} from "../../providers/app-provider";
import MarkerInfo from "./marker-info";
import MarketPopup from "./market-popup";
import ClickedPoint from "./clicked-point";
import {X} from "lucide-react";
import {buffer, point as pointer} from "@turf/turf";
import {IAdvertisement} from "../../models/IAdvertisement";
import {useFilterContext} from "../../providers/filter-provider";

type MapBoxProps = {
    width: string;
    height: string;
    adverts: IAdvertisement[]
}

const MapBox = ({width, height, adverts}: MapBoxProps) => {

    const {selected} = useAppContext<IAdvertisement>();
    const {radius, point, setPoint, setCoordinates} = useFilterContext();
    const [lng, setLng] = useState(adverts?.[0]?.position?.lng ?? 0);
    const [lat, setLat] = useState(adverts?.[0]?.position?.lat ?? 0);
    const [circle, setCircle] = useState<any>(null);
    const [zoom, setZoom] = useState(11);

    const [viewport, setViewport] = React.useState({
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

    /**
     * Set marker's list
     */
    const markers = useCallback(() => adverts?.map(
        (item, index) => (
            <Marker key={`${index}`} longitude={item.position?.lng ?? 0} latitude={item?.position?.lat ?? 0}>
                <MarkerInfo item={item}/>
            </Marker>
        )
    ), [adverts])

    const mapClickHandler = useCallback((e: MapEvent) => {
        if (e) {
            setPoint({
                lat: e?.lngLat[1],
                lng: e?.lngLat[0]
            })
        }
    }, [setPoint])

    return (
        <>
            <ReactMapGL onClick={mapClickHandler}
                        transitionDuration={500}
                        mapStyle="mapbox://styles/geekles007/ckpgybhd11utk17qkavbs7adw"
                        {...viewport} height={height} width={width} onViewportChange={setViewport}>
                {markers()}
                {point && <ClickedPoint point={point}/>}
                {
                    point && <Source id="my-data" type="geojson" data={circle}>
                        <Layer
                            id="locations"
                            type="line"
                            paint={{
                                "line-color": "#088",
                                "line-opacity": 0.4
                            }}
                        />
                    </Source>
                }
                {
                    point && <Source id="my-data" type="geojson"
                                     data={{type: "FeatureCollection", features: []}}>
                        <Layer
                            id="radius-search"
                            type="fill"
                            paint={{
                                "fill-color": "#088",
                                "fill-opacity": 0.4
                            }}
                        />
                    </Source>
                }
                <MarketPopup/>
                <FullscreenControl className={"absolute left-4 top-4"}/>
                <NavigationControl className={"absolute left-4 top-4"}/>
            </ReactMapGL>
            {
                point && <button onClick={() => setPoint(null)}
                                 className={"px-1.5 py-1 text-sm absolute top-4 right-4 bg-red-400 flex items-center gap-1 rounded-md"}>
                    <X size={16}/> <span>Annuler la selection</span>
                </button>
            }
        </>
    );

}

export default memo(MapBox);
