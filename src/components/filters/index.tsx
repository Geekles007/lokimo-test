import React, {memo} from "react";
import Slider from "../slider";

type FiltersProps = {}

const Filters = ({}: FiltersProps) => {

    return <div className={"flex flex-col gap-6"}>
        <Slider />
    </div>

}

export default memo(Filters);
