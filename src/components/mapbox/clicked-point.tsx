import React, {memo} from "react";
import {Marker} from "react-map-gl";
import {IPoint} from "../../models/IPoint";

type ClickedPointProps = {
    point: IPoint
}

const ClickedPoint = ({point}: ClickedPointProps) => {

    return <>
        <Marker longitude={point.lng} latitude={point.lat} >
            <div className="animate-ping w-3 h-3 bg-primary-400 rounded-full"></div>
        </Marker>
    </>

}

export default memo(ClickedPoint);
