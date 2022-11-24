import React, {memo} from "react";
import SearchInput from "../search-input";
import Slider from "../slider";

type FiltersProps = {}

const Filters = ({}: FiltersProps) => {

    return <div className={"flex flex-col gap-6"}>
        {/*<SearchInput placeholder={"Rechercher"} />*/}
        <Slider />
    </div>

}

export default memo(Filters);
