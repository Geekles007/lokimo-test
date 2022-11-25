import React, {memo} from "react";
import {Link, Scale3d, Star, X} from "lucide-react";
import {IAdvertisement} from "../../models/IAdvertisement";
import {useAppContext} from "../../providers/app-provider";

type BadgesProps = {
    item?: Partial<IAdvertisement>
}

const Badges = ({item}: BadgesProps) => {
    const {setSelected} = useAppContext<IAdvertisement>();

    return <>
        <div className="flex items-center gap-2 pr-9 lg:pr-0">
            {
                item?.data?.status?.highlighted ? <div
                    className="px-2 py-1 bg-yellow-200 h-6 text-slate-600 rounded-md text-xs flex items-center justify-center">
                    <Star size={13} className="text-black"/>
                </div> : <></>
            }
            {
                item?.data?.status?.is3dHighlighted ? <div
                    className="px-2 py-1 bg-yellow-200 h-6 text-slate-600 rounded-md text-xs flex items-center justify-center">
                    <Scale3d size={13} className="text-black"/>
                </div> : <></>
            }
            <div className="px-2 py-1 bg-primary-200 h-6 text-slate-600 rounded-md text-xs">
                {item?.buy ? "Achat" : "Location"}
            </div>
            {
                item?.data?.link ? <a href={item?.data?.link} target={"_blank"}
                                      className="px-2 py-1 bg-primary-200 h-6 text-slate-600 rounded-md text-xs flex items-center justify-center">
                    <Link size={13}/>
                </a> : <></>
            }
            {
                <a onClick={() => setSelected(undefined)}
                   className="px-2 py-1 bg-red-500 h-6 block lg:hidden text-slate-600 rounded-md text-xs flex items-center absolute right-2 justify-center">
                    <X size={13}/>
                </a>
            }
        </div>
    </>

}

export default memo(Badges);
