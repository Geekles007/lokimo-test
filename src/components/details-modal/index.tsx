import React, {memo} from "react";
import {useAppContext} from "../../providers/app-provider";
import {IAdvertisement} from "../../models/IAdvertisement";
import ListItem from "../listing/list-item";

type DetailsModalProps = {}

const DetailsModal = ({}: DetailsModalProps) => {
    const {selected} = useAppContext<IAdvertisement>();

    return <div
        className={`modal transition-all flex w-screen duration-500 pointer-events-auto block lg:pointer-events-none lg:hidden absolute m-2 bottom-2 translate-y-full opacity-0 z-50 ${selected ? "-translate-y-0 opacity-100" : ""}`}>
        <ListItem item={selected}/>
    </div>

}

export default memo(DetailsModal);
