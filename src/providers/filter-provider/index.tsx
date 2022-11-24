import {createContext, PropsWithChildren, useContext} from "react";
import {IFilterResponse} from "../../models/IFilterResponse";

export const FilterContext = createContext<IFilterResponse | null>(null);

interface FilterProviderProps<T> extends PropsWithChildren {
    value: IFilterResponse
}

export const FilterProvider = <T,>({children, value}: FilterProviderProps<T>) => {
    return <FilterContext.Provider value={value}>
        {children}
    </FilterContext.Provider>
}

export const useFilterContext = () => {
    const value = useContext<IFilterResponse | null>(FilterContext);
    if(value === null) throw new Error("Provider not found!");
    return value;
}
