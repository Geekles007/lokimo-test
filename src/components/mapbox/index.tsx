import React, {memo, useEffect, useState} from "react";
import {MAP_BOX_TOKEN} from "../../constants";
import ReactMapGL, {Marker, NavigationControl,
    FullscreenControl} from "react-map-gl";
import {useAppContext} from "../providers/app-provider";
import {IPaginate} from "../../models/IPaginate";
import MarkerInfo from "./marker-info";
import MarketPopup from "./market-popup";

type MapBoxProps = {
    width: string;
    height: string;
}

const MapBox = ({width, height}: MapBoxProps) => {

    const {paginate, selected} = useAppContext<IPaginate>();
    const [lng, setLng] = useState(paginate?.data[0]?.position?.lng);
    const [lat, setLat] = useState(paginate?.data[0]?.position?.lat);
    const [zoom, setZoom] = useState(11);

    const [viewport, setViewport] = React.useState({
        longitude: lng,
        latitude: lat,
        zoom: zoom,
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

    const markers = () => paginate?.data?.map(
        item => (
            <Marker key={item?.id} longitude={item.position?.lng} latitude={item?.position?.lat} >
                <MarkerInfo item={item} />
            </Marker>
        )
    )

    return (
        <>
            <ReactMapGL mapStyle="mapbox://styles/geekles007/ckpgybhd11utk17qkavbs7adw" {...viewport} height={height}  width={width} onViewportChange={setViewport}>
                {markers()}
                <MarketPopup/>
                <FullscreenControl className={"absolute left-4 top-4"} />
                <NavigationControl className={"absolute left-4 top-4"} />
            </ReactMapGL>
        </>
    );

}

export default memo(MapBox);
