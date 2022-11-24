import React, {memo} from "react";
import {BeatLoader} from "react-spinners";

type LoadingProps = {}

const Loading = ({}: LoadingProps) => {

    return <div className={"flex items-center justify-center absolute inset-0"}>
        <BeatLoader color={"rgb(5, 150, 105)"} />
    </div>

}

export default memo(Loading);
