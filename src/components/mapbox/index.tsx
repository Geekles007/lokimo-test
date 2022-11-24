import React, {memo, useEffect, useState} from "react";
import {MAP_BOX_TOKEN} from "../../constants";
import ReactMapGL, {FullscreenControl, Layer, MapEvent, Marker, NavigationControl, Source} from "react-map-gl";
import {useAppContext} from "../../providers/app-provider";
import {IPaginate} from "../../models/IPaginate";
import MarkerInfo from "./marker-info";
import MarketPopup from "./market-popup";
import {IPoint} from "../../models/IPoint";
import ClickedPoint from "./clicked-point";
import * as turf from "@turf/turf";
import {Units} from "@turf/turf";

type MapBoxProps = {
    width: string;
    height: string;
}

const MapBox = ({width, height}: MapBoxProps) => {

    const {paginate, selected} = useAppContext<IPaginate>();
    const [lng, setLng] = useState(paginate?.data[0]?.position?.lng);
    const [lat, setLat] = useState(paginate?.data[0]?.position?.lat);
    const [point, setPoint] = useState<IPoint | null>(null);
    const [circle, setCircle] = useState<any>(null);
    const [zoom, setZoom] = useState(11);

    useEffect(() => {
        if(point) {
            const options = { steps: 2, units: "kilometers" as Units, properties: { foo: "bar" } };
            setCircle(turf.circle([point.lng, point.lat], 5, options));
        }
    }, [point])

    const [viewport, setViewport] = React.useState({
        longitude: lng,
        latitude: lat,
        zoom: zoom,
        pitch: 0,
        bearing: 0,
        mapboxApiAccessToken: MAP_BOX_TOKEN
    });

    useEffect(() => {
        if(selected) {
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
            <Marker key={item?.id} longitude={item.position?.lng} latitude={item?.position?.lat} >
                <MarkerInfo item={item} />
            </Marker>
        )
    )

    /**
     * get coordinates of clicked point on the map
     * @param e
     */
    const mapClickHandler = (e: MapEvent) => {
        if(e) {
            setPoint({
                lat: e?.lngLat[1],
                lng: e?.lngLat[0]
            })
        }
    }

    return (
        <>
            <ReactMapGL onClick={mapClickHandler}
                        transitionDuration={300}
                        mapStyle="mapbox://styles/geekles007/ckpgybhd11utk17qkavbs7adw"
                        {...viewport} height={height}  width={width} onViewportChange={setViewport}>
                {markers()}
                {point && <ClickedPoint point={point} />}
                {
                    point && <Source id="my-data" type="geojson" data={circle}>
                        <Layer
                            id="point-90-hi"
                            type="fill"
                            paint={{
                                "fill-color": "#088",
                                "fill-opacity": 0.4,
                                "fill-outline-color": "yellow"
                            }}
                        />
                    </Source>
                }
                <MarketPopup/>
                <FullscreenControl className={"absolute left-4 top-4"} />
                <NavigationControl className={"absolute left-4 top-4"} />
            </ReactMapGL>
        </>
    );

}

export default memo(MapBox);
