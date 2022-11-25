import React, {createRef, memo} from "react";
import {useAppContext} from "../../providers/app-provider";
import {IAdvertisement} from "../../models/IAdvertisement";
import ListItem from "../listing/list-item";
import useOutsideClick from "../../hooks/useOutsideClick";
import useWindowDimensions from "../../hooks/useWindowDimensions";

type DetailsModalProps = {}

const DetailsModal = ({}: DetailsModalProps) => {
    const {selected, setSelected} = useAppContext<IAdvertisement>();
    const modalRef = createRef<HTMLDivElement>();
    const {width} = useWindowDimensions();

    useOutsideClick(modalRef, () => {
        if(width <= 1024) {
            console.log("check");
            setSelected(undefined)
        }
    });

    return <div ref={modalRef}
        className={`modal transition-all flex w-screen duration-500 pointer-events-auto block lg:pointer-events-none lg:hidden absolute m-2 bottom-2 translate-y-full opacity-0 z-50 ${selected ? "-translate-y-0 opacity-100" : ""}`}>
        <ListItem item={selected}/>
    </div>

}

export default memo(DetailsModal);
