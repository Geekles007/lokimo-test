import React, {memo, Suspense, lazy} from "react";
import Filters from "../../components/filters";
import Listing from "../../components/listing";
import {useAppContext} from "../../providers/app-provider";
import {IAdvertisement} from "../../models/IAdvertisement";
import Loading from "../../components/loading";

const MapBox = lazy(() => import("../../components/mapbox"));

type HomePageProps = {}

const HomePage = ({}: HomePageProps) => {
    const {adverts} = useAppContext<IAdvertisement>();

    return <div className={"flex gap-y-2 flex-col lg:grid lg:gap-8 lg:grid-cols-12 grid-rows-6 h-full"}>
        <div className="w-full lg:w-auto col-span-12 lg:col-span-4 row-span-1 lg:row-span-6 lg:h-full flex flex-col gap-8">
            <Filters />
            <Listing />
        </div>
        <div className="mapbox z-40 w-full lg:h-auto lg:w-auto flex-1 col-span-12 lg:col-span-8 relative row-span-5 lg:row-span-6 rounded-xl overflow-hidden">
            <Suspense fallback={<Loading />}>
                <MapBox adverts={adverts} width={"100%"} height={"100%"} />
            </Suspense>
        </div>
    </div>

}

export default memo(HomePage);
