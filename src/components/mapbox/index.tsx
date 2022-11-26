import React, {memo, useCallback} from "react";
import ReactMapGL, {FullscreenControl, Layer, Marker, NavigationControl, Source} from "react-map-gl";
import MarkerInfo from "./marker-info";
import MarketPopup from "./market-popup";
import ClickedPoint from "./clicked-point";
import {X} from "lucide-react";
import {IAdvertisement} from "../../models/IAdvertisement";
import {useMap} from "../../hooks/useMap";

type MapBoxProps = {
    width: string;
    height: string;
    adverts: IAdvertisement[]
}

const MapBox = ({width, height, adverts}: MapBoxProps) => {

    const {mapClickHandler, setViewport, viewport, point, setPoint, circle, setCircle} = useMap(adverts);

    /**
     * Set marker's list
     */
    const markers = useCallback(() => adverts?.map((item, index) => {
        return <Marker key={`${index}`} longitude={item.position?.lng ?? 0} latitude={item?.position?.lat ?? 0}>
            <MarkerInfo item={item}/>
        </Marker>
    }), [adverts])

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
