import React, {memo} from "react";
import {Popup} from "react-map-gl";
import {useAppContext} from "../../providers/app-provider";
import BasicInfo from "../basic-info";
import HouseInfo from "../house-info";
import {IAdvertisement} from "../../models/IAdvertisement";
import {useAdvertStore} from "../../stores/DataStore";

type MarketPopupProps = {
}

const MarketPopup = ({}: MarketPopupProps) => {
    const {setSelected, selected: popupInfo} = useAdvertStore(state => state);

    return <Popup
        tipSize={5}
        anchor="bottom"
        longitude={popupInfo?.position?.lng ?? 0}
        latitude={popupInfo?.position?.lat ?? 0}
        closeOnClick={false}
        onClose={() => setSelected(undefined)}
    >
        <div className="flex flex-col gap-4 w-72">
            <BasicInfo item={popupInfo} />
            <HouseInfo item={popupInfo}/>
        </div>
    </Popup>

}

export default memo(MarketPopup);
