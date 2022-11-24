import React, {ChangeEvent, memo, useCallback, useState} from "react";
import "./default.css";

type SliderProps = {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({onChange}: SliderProps) => {
    const [value, setValue] = useState(0);

    const changeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const val = evt.target.value;
        onChange?.(evt);
        setValue(parseInt(val));
    }, [value])

    return <div className={"wrapper"}>
        <input className={"range"} min={0} max={10} defaultValue={value} type="range" step={1} onChange={changeHandler}/>
        <span className={"value"}>{value} Km</span>
    </div>

}

export default memo(Slider);
