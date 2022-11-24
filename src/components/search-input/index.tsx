import React, {ChangeEvent, memo} from "react";
import {Search} from "lucide-react";

type SearchInputProps = {
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({placeholder, onChange}: SearchInputProps) => {

    return <div className={"flex items-center border border-4 border-gray-600/10 rounded-lg p-2"}>
        <Search size={20} className={"mr-2"} />
        <input type="text" className={"flex-1 outline-0"} onChange={onChange} placeholder={placeholder ?? "Search"}/>
    </div>

}

export default memo(SearchInput);
