import React, {createRef, memo} from "react";
import ListItem from "./list-item";
import './default.css';
import {useAppContext} from "../../providers/app-provider";
import Loading from "../loading";
import {IAdvertisement} from "../../models/IAdvertisement";

type ListingProps = {}

const Listing = ({}: ListingProps) => {

    const {isLoading, adverts} = useAppContext<IAdvertisement>();
    const listRef = createRef<HTMLDivElement>();

    return <div ref={listRef} className={"listing pb-24 overflow-y-scroll relative after:content-[''] " +
        "after:fixed after:pointer-events-none after:bottom-0 after:left-0" +
        "after:right-0 after:h-32 scroll-smooth after:z-20 lg:flex lg:flex-col lg:gap-5 hidden"}>
        {
            isLoading ? <Loading/> :
                adverts?.map((item, index) => (
                    <ListItem key={index} item={item}/>
                ))
        }
    </div>

}

export default memo(Listing);
