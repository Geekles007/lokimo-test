import React, {ChangeEvent, memo, useCallback, useState} from "react";
import "./default.css";
import {useAppContext} from "../../providers/app-provider";

type SliderProps = {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({onChange}: SliderProps) => {
    const {radius, setRadius} = useAppContext();

    const changeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const val = evt.target.value;
        onChange?.(evt);
        setRadius(parseInt(val));
    }, [radius])

    return <div className={"wrapper"}>
        <input className={"range"} min={0} max={10} defaultValue={radius} type="range" step={1} onChange={changeHandler}/>
        <span className={"value"}>{radius} Km</span>
    </div>

}

export default memo(Slider);
