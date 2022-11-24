import React, {memo} from "react";
import {Check} from "lucide-react";

type TagProps = {
    title: string;
}

const Tag = ({title}: TagProps) => {

    return <div className={"flex gap-1 bg-gray-800 p-1 rounded-xl items-center"}>
        <div className="flex items-center justify-center w-3 h-3 bg-primary-400 rounded-full">
            <Check size={9} />
        </div>
        <span className={"text-xs text-white mr-1"}>{title}</span>
    </div>

}

export default memo(Tag);
