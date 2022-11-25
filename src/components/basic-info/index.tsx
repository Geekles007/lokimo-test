import React, {memo} from "react";
import {Calendar, Home, MapPin} from "lucide-react";
import {DATE_FORMAT} from "../../constants";
import {IAdvertisement} from "../../models/IAdvertisement";
import {DateTime} from "luxon";

type BasicInfoProps = {
    item?: Partial<IAdvertisement>;
}

const BasicInfo = ({item}: BasicInfoProps) => {

    return <>
        <div className="flex flex-col gap-1">
            <strong className={"text-sm max-w-xs"}>{item?.data?.title} - <span className={"italic text-primary-600 text-xs font-normal"}>{item?.data?.reference}</span></strong>
            <div className="flex items-center gap-3 flex-wrap">
                <div className={"flex capitalize items-center text-slate-400 text-xs"}>
                    <MapPin size={13}/>&nbsp;<span>{item?.data?.city}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className={"flex items-center text-slate-400 text-xs"}>
                    <Calendar size={13}/>&nbsp;
                    <span>{DateTime.fromISO(item?.data?.publicationDate ?? "").toFormat(DATE_FORMAT)}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className={"flex items-center text-slate-400 text-xs"}>
                    <Home size={13}/>&nbsp;<span>{item?.house ? "Maison" : "Appartement"}</span>
                </div>
            </div>
        </div>
    </>

}

export default memo(BasicInfo);
