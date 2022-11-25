import React, {memo} from "react";
import {IAdvertisement} from "../../models/IAdvertisement";
import {getCurrencyFormat} from "../../helpers";
import Tag from "../tag";
import {useAppContext} from "../../providers/app-provider";
import BasicInfo from "../basic-info";
import HouseInfo from "../house-info";
import {Link, Star, Scale3d, X} from "lucide-react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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
                <div className="flex items-center gap-2 pr-9 lg-pr-0">
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
            {
                selected && selected?.id === item?.id ?
                    <div className={"z-20"}>
                        <span className={"text-xs text-primary-600"}>Plus d'informations</span>
                        <div className={"mt-2"}>
                            <div className="flex items-start gap-x-8 gap-y-2 flex-wrap">
                                <div className="flex flex-col">
                                    <strong className={"text-sm"}>Commune (INSEE)</strong>
                                    <span className={"text-sm text-slate-400"}>{item?.city}</span>
                                </div>
                                {
                                    item?.meter_square ? <div className="flex flex-col">
                                        <strong className={"text-sm"}>Prix/m<sup>2</sup></strong>
                                        <span className={"text-sm text-primary-500"}>
                                {getCurrencyFormat(item?.meter_square ?? 0, "€")}
                            </span>
                                    </div> : <></>
                                }
                                {
                                    item?.data?.heating ? <div className="flex flex-col">
                                        <strong className={"text-sm"}>Chauffage</strong>
                                        <span
                                            className={"text-sm text-slate-400 capitalize"}>{item?.data?.heating}</span>
                                    </div> : <></>
                                }
                                {
                                    item?.data?.parkingPlacesQuantity ? <div className="flex flex-col">
                                        <strong className={"text-sm"}>Place de parking</strong>
                                        <span
                                            className={"text-sm text-slate-400 capitalize"}>{item?.data?.parkingPlacesQuantity}</span>
                                    </div> : <></>
                                }
                                {
                                    item?.data?.newProperty ? <div className="flex flex-col">
                                        <strong className={"text-sm"}>Neuf/ve</strong>
                                        <span
                                            className={"text-sm text-slate-400 capitalize"}>{item?.data?.newProperty ? "Oui" : "Non"}</span>
                                    </div> : <></>
                                }
                                {
                                    item?.data?.yearOfConstruction ? <div className="flex flex-col">
                                        <strong className={"text-sm"}>Année de construction</strong>
                                        <span
                                            className={"text-sm text-slate-400 capitalize"}>{item?.data?.yearOfConstruction}</span>
                                    </div> : <></>
                                }
                                {
                                    item?.last_date ? <div className="flex flex-col">
                                        <strong className={"text-sm"}>Délai</strong>
                                        <span className={"text-sm text-slate-400 capitalize"}>{item?.last_date}</span>
                                    </div> : <></>
                                }
                            </div>
                        </div>
                    </div>
                    : <></>
            }
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
