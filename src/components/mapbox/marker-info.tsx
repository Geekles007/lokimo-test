import React, {memo} from "react";
import {getCurrencyFormat} from "../../helpers";
import {IAdvertisement} from "../../models/IAdvertisement";
import {useAppContext} from "../../providers/app-provider";
import {useAdvertStore} from "../../stores/DataStore";

type MarketInfoProps = {
    item?: IAdvertisement;
}

const MarkerInfo = ({item}: MarketInfoProps) => {
    const {setSelected, selected} = useAdvertStore(state => state);

    return <>
        <a onClick={() => setSelected(item)} href={`#${item?.id?.toString()}`}
           className={`px-2 py-1 bg-primary-400 text-xs relative rounded-md flex
            items-center after:content-[''] after:w-2 after:h-2 after:bg-primary-400
            after:rotate-45 after:absolute after:-bottom-1 ${selected?.id === item?.id ? "bg-black after:bg-black text-white" : ""}`}>
            {getCurrencyFormat(item?.price ?? 0, "€")}
        </a>
    </>

}

export default memo(MarkerInfo);
