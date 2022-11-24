import React, {createRef, memo, ReactNode, useEffect, useState} from "react";
import {MAP_BOX_TOKEN} from "../../constants";
import ReactMapGL, {FullscreenControl, Layer, MapEvent, Marker, NavigationControl, Source} from "react-map-gl";
import {useAppContext} from "../../providers/app-provider";
import {IPaginate} from "../../models/IPaginate";
import MarkerInfo from "./marker-info";
import MarketPopup from "./market-popup";
import {IPoint} from "../../models/IPoint";
import ClickedPoint from "./clicked-point";
import {X} from "lucide-react";
import {point as pointer, buffer} from "@turf/turf";

type MapBoxProps = {
    width: string;
    height: string;
}

const MapBox = ({width, height}: MapBoxProps) => {

    const {paginate, selected, radius} = useAppContext<IPaginate>();
    const [lng, setLng] = useState(paginate?.data[0]?.position?.lng);
    const [lat, setLat] = useState(paginate?.data[0]?.position?.lat);
    const [point, setPoint] = useState<IPoint | null>(null);
    const [circle, setCircle] = useState<any>(null);
    const [zoom, setZoom] = useState(11);

    const sourceRef = createRef<any>();

    const [viewport, setViewport] = React.useState({
        longitude: lng,
        latitude: lat,
        zoom: zoom,
        pitch: 0,
        bearing: 0,
        mapboxApiAccessToken: MAP_BOX_TOKEN
    });

    useEffect(() => {
        if (point) {
            const turfPoint = pointer([point?.lng ?? 0, point?.lat ?? 0]);
            setCircle(buffer(turfPoint, radius, {units: 'kilometers'}));
            console.log(sourceRef.current);
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
    const markers = () => paginate?.data?.map(
        item => (
            <Marker key={item?.id} longitude={item.position?.lng} latitude={item?.position?.lat}>
                <MarkerInfo item={item}/>
            </Marker>
        )
    )

    const mapClickHandler = (e: MapEvent) => {
        if (e) {
            setPoint({
                lat: e?.lngLat[1],
                lng: e?.lngLat[0]
            })
        }
    }

    // console.log("radius >>>", circle);

    return (
        <>
            <ReactMapGL ref={sourceRef} onClick={mapClickHandler}
                        transitionDuration={300}
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
                    point && <Source id="my-data" type="geojson" data={{type: "FeatureCollection", features: []}}>
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
