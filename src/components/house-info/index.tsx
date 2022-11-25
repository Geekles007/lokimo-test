import React, {memo} from "react";
import {IAdvertisement} from "../../models/IAdvertisement";

type HouseInfoProps = {
    item?: Partial<IAdvertisement>;
}

const HouseInfo = ({item}: HouseInfoProps) => {

    return <div className="flex items-center text-xs gap-2 flex-wrap">
        {
            item?.data?.bedroomsQuantity ? <>
                <div>{item?.data?.bedroomsQuantity} Chambre{item?.data?.bedroomsQuantity && item?.data?.bedroomsQuantity > 1 ? "s" : ""}</div>
            </> : <></>
        }
        {
            item?.data?.bathroomsQuantity ? <>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>{item?.data?.bathroomsQuantity} Douche{item?.data?.bathroomsQuantity && item?.data?.bathroomsQuantity > 1 ? "s" : ""}</div>
            </> : <></>
        }
        {
            item?.data?.toiletQuantity ? <>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>{item?.data?.toiletQuantity} Toilette{item?.data?.toiletQuantity && item?.data?.toiletQuantity > 1 ? "s" : ""}</div>
            </> : <></>
        }
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div>{item?.surface} m<sup>2</sup></div>
        {
            item?.rooms ? <>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>{item?.rooms} Pièce{item?.rooms && item?.rooms > 1 ? "s" : ""}</div>
            </> : <></>
        }
    </div>

}

export default memo(HouseInfo);
