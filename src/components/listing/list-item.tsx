import React, {memo} from "react";
import {IAdvertisement} from "../../models/IAdvertisement";
import {getCurrencyFormat} from "../../helpers";
import Tag from "../tag";
import {useAppContext} from "../../providers/app-provider";
import BasicInfo from "../basic-info";
import HouseInfo from "../house-info";
import {Link, Star, Scale3d, X} from "lucide-react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import MoreInfos from "./more-infos";
import Badges from "./badges";

type ListItemProps = {
    item?: Partial<IAdvertisement>
}

const ListItem = ({item}: ListItemProps) => {
    const {setSelected, selected} = useAppContext<IAdvertisement>();
    const {width} = useWindowDimensions();

    return <div id={item?.id?.toString()} className={"lg:w-auto w-full"} onClick={width <= 1024 ? undefined : () => setSelected(item)}>
        <div
            className={"transition-all w-full relative lg:cursor-pointer cursor-default duration-500 border border-gray-200 rounded-lg p-2 min-h-32 shadow " +
                "transition-all duration-500 hover:shadow-md bg-white flex flex-col gap-2 overflow-hidden" +
                `border-2 hover:border-primary-400 ${selected?.id === item?.id ? "border-primary-400 bg-primary-50" : ""}`}>
            <div className="flex justify-between items-start flex-wrap gap-2 z-20">
                <BasicInfo item={item}/>
                <Badges item={item} />
            </div>
            <div className="flex-1 flex items-start gap-2 flex-wrap z-20">
                {item?.data?.hasCellar && <Tag title={"Cave"}/>}
                {item?.data?.hasFirePlace && <Tag title={"Cheminée"}/>}
                {item?.data?.hasGarden && <Tag title={"Jardin"}/>}
                {item?.data?.hasPool && <Tag title={"Piscine"}/>}
                {item?.data?.hasSeparateToilet && <Tag title={"Toilette séparée"}/>}
                {item?.data?.hasTerrace && <Tag title={"Terrace"}/>}
            </div>
            <div className="flex justify-between items-end flex-wrap z-20">
                <HouseInfo item={item}/>
                {
                    item?.price ? <div className="text-lg">
                        <strong>{getCurrencyFormat(item?.price ?? 0, "€")}</strong>
                    </div> : <></>
                }
            </div>
            <MoreInfos item={item} />
            {
                item?.data?.status?.closedByUser ? <div className="block absolute inset-0
            bg-red-500/5 text-red-500/40 uppercase font-bold text-6xl flex
            items-center justify-center rounded-lg w-full h-full z-[1]">
                    <strong className={"-rotate-12"}>Fermé</strong>
                </div> : <></>
            }
        </div>
    </div>

}

export default memo(ListItem);
