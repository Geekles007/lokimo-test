import React, {memo} from "react";
import MapBox from "../../components/mapbox";
import Filters from "../../components/filters";
import Listing from "../../components/listing";
import {useAppContext} from "../../components/providers/app-provider";
import Loading from "../../components/loading";

type HomePageProps = {}

const HomePage = ({}: HomePageProps) => {
    const {isLoading} = useAppContext();

    return <div className={"grid gap-8 grid-cols-12 h-full"}>
        <div className="col-span-4 h-full flex flex-col gap-8">
            <Filters />
            <Listing />
        </div>
        <div className="col-span-8 relative rounded-xl overflow-hidden">
            {
                isLoading ? <Loading /> : <MapBox width={"100%"} height={"100%"} />
            }
        </div>
    </div>

}

export default memo(HomePage);
