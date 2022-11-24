import {createContext, PropsWithChildren, useContext} from "react";
import {TResponse} from "../../../models/IResponse";

export const AppContext = createContext<TResponse<any> | null>(null);

interface AppProviderProps<T> extends PropsWithChildren {
    value: TResponse<T>
}

export const AppProvider = <T,>({children, value}: AppProviderProps<T>) => {
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = <T,>() => {
    const value = useContext<TResponse<T> | null>(AppContext);
    if(value === null) throw new Error("Provider not found!");
    return value;
}
