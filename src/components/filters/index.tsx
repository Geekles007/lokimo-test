import React, {memo} from "react";
import Slider from "../slider";

type FiltersProps = {}

const Filters = ({}: FiltersProps) => {

    return <div className={"flex flex-col gap-2 p-2 bg-gray-800 rounded-lg lg:p-0 lg:bg-transparent"}>
        <span className={"text-xs lg:text-sm text-slate-400 lg:text-gray-800 lg:bg-gray-800 lg:text-slate-50 lg:p-2 lg:rounded-lg"}>
            Cliquer sur la où vous voulez sur la carte et ajustez ensuite le rayon ici
        </span>
        <Slider/>
    </div>

}

export default memo(Filters);
