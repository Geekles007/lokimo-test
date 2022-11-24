import React, {createRef, memo} from "react";
import ListItem from "./list-item";
import './default.css';
import {useAppContext} from "../providers/app-provider";
import Loading from "../loading";
import {IPaginate} from "../../models/IPaginate";

type ListingProps = {}

const Listing = ({}: ListingProps) => {

    const {isLoading, paginate, setPage} = useAppContext<IPaginate>();
    const listRef = createRef<HTMLDivElement>();

    return <div ref={listRef} className={"listing pb-24 overflow-y-scroll relative after:content-[''] " +
        "after:fixed after:pointer-events-none after:bottom-0 after:left-0 " +
        "after:right-0 after:h-32 scroll-smooth"}>
        {
            isLoading ? <Loading/> :
                paginate?.data?.map((item) => (
                    <ListItem key={item?.id} item={item}/>
                ))
        }
    </div>

}

export default memo(Listing);
