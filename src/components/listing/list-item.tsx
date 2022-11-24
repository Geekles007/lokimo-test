import React, {memo} from "react";
import {IAdvertisement} from "../../models/IAdvertisement";
import {getCurrencyFormat} from "../../helpers";
import Tag from "../tag";
import {useAppContext} from "../../providers/app-provider";
import {IPaginate} from "../../models/IPaginate";
import BasicInfo from "../basic-info";
import HouseInfo from "../house-info";

type ListItemProps = {
    item?: IAdvertisement
}

const ListItem = ({item}: ListItemProps) => {
    const {setSelected, selected} = useAppContext<IPaginate>();

    return <a id={item?.id?.toString()} onClick={() => setSelected(item)}>
        <div className={"border border-gray-200 rounded-lg p-2 min-h-32 mb-5 shadow " +
            "transition-all duration-500 hover:shadow-md bg-white flex flex-col gap-2 " +
            `border-2 hover:border-primary-400 ${selected?.id === item?.id ? "border-primary-400 bg-primary-50" : ""}`}>
            <div className="flex justify-between items-start flex-wrap gap-2">
                <BasicInfo item={item} />
                <div className="px-2 py-1 bg-primary-200 text-slate-600 rounded-md text-xs">
                    {item?.buy ? "Achat" : "Location"}
                </div>
            </div>
            <div className="flex-1 flex items-start gap-2 flex-wrap">
                {item?.data?.hasCellar && <Tag title={"Cave"}/>}
                {item?.data?.hasFirePlace && <Tag title={"Cheminée"}/>}
                {item?.data?.hasGarden && <Tag title={"Jardin"}/>}
                {item?.data?.hasPool && <Tag title={"Piscine"}/>}
                {item?.data?.hasSeparateToilet && <Tag title={"Toilette séparée"}/>}
                {item?.data?.hasTerrace && <Tag title={"Terrace"}/>}
            </div>
            <div className="flex justify-between items-end flex-wrap">
                <HouseInfo item={item} />
                <div className="text-lg">
                    <strong>{getCurrencyFormat(item?.price ?? 0, "€")}</strong>
                </div>
            </div>
        </div>
    </a>

}

export default memo(ListItem);
