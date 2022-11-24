import React, {memo} from "react";
import {IAdvertisement} from "../../models/IAdvertisement";

type HouseInfoProps = {
    item?: Partial<IAdvertisement>;
}

const HouseInfo = ({item}: HouseInfoProps) => {

    return <div className="flex items-center text-xs gap-2">
        <div>{item?.data?.bedroomsQuantity} Chambres</div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div>{item?.surface} m<sup>2</sup></div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div>{item?.rooms} Pièces</div>
    </div>

}

export default memo(HouseInfo);
