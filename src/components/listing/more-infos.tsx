import React, {memo} from "react";
import {getCurrencyFormat} from "../../helpers";
import {IAdvertisement} from "../../models/IAdvertisement";
import {useAppContext} from "../../providers/app-provider";
import {useAdvertStore} from "../../stores/DataStore";

type MoreInfosProps = {
    item?: IAdvertisement;
}

const MoreInfos = ({item}: MoreInfosProps) => {
    const {selected} = useAdvertStore(state => state);

    return <div>
        {
            selected && selected?.id === item?.id ?
                <div className={"z-20"}>
                    <span className={"text-xs text-primary-600"}>Plus d'informations</span>
                    <div className={"mt-2"}>
                        <div className="flex selecteds-start gap-x-8 gap-y-2 flex-wrap">
                            <div className="flex flex-col">
                                <strong className={"text-sm"}>Commune (INSEE)</strong>
                                <span className={"text-sm text-slate-400"}>{selected?.city}</span>
                            </div>
                            {
                                selected?.meter_square ? <div className="flex flex-col">
                                    <strong className={"text-sm"}>Prix/m<sup>2</sup></strong>
                                    <span className={"text-sm text-primary-500"}>
                                {getCurrencyFormat(selected?.meter_square ?? 0, "€")}
                            </span>
                                </div> : <></>
                            }
                            {
                                selected?.data?.heating ? <div className="flex flex-col">
                                    <strong className={"text-sm"}>Chauffage</strong>
                                    <span
                                        className={"text-sm text-slate-400 capitalize"}>{selected?.data?.heating}</span>
                                </div> : <></>
                            }
                            {
                                selected?.data?.parkingPlacesQuantity ? <div className="flex flex-col">
                                    <strong className={"text-sm"}>Place de parking</strong>
                                    <span
                                        className={"text-sm text-slate-400 capitalize"}>{selected?.data?.parkingPlacesQuantity}</span>
                                </div> : <></>
                            }
                            {
                                selected?.data?.newProperty ? <div className="flex flex-col">
                                    <strong className={"text-sm"}>Neuf/ve</strong>
                                    <span
                                        className={"text-sm text-slate-400 capitalize"}>{selected?.data?.newProperty ? "Oui" : "Non"}</span>
                                </div> : <></>
                            }
                            {
                                selected?.data?.yearOfConstruction ? <div className="flex flex-col">
                                    <strong className={"text-sm"}>Année de construction</strong>
                                    <span
                                        className={"text-sm text-slate-400 capitalize"}>{selected?.data?.yearOfConstruction}</span>
                                </div> : <></>
                            }
                            {
                                selected?.last_date ? <div className="flex flex-col">
                                    <strong className={"text-sm"}>Délai</strong>
                                    <span className={"text-sm text-slate-400 capitalize"}>{selected?.last_date}</span>
                                </div> : <></>
                            }
                        </div>
                    </div>
                </div>
                : <></>
        }
    </div>

}

export default memo(MoreInfos);
