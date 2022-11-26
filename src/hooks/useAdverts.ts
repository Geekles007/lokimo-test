import {TResponse} from "../models/IResponse";
import {DATA_API} from "../constants";
import {useCallback, useEffect, useState} from "react";
import {IAdvertisement} from "../models/IAdvertisement";
import {fetcher} from "../helpers";
import useSWR from "swr";

/**
 * Hook to manage data changing
 * @param url
 */
export const useAdverts = (url: string): TResponse<Partial<IAdvertisement>> => {
    const {data, error} = useSWR<IAdvertisement[]>(`${DATA_API}/${url}`, fetcher);
    const [selected, setSelected] = useState<Partial<IAdvertisement>>();
    const [adverts, setAdverts] = useState<Partial<IAdvertisement>[]>(data ?? []);

    const selectHandler = useCallback((item?: Partial<IAdvertisement>) => {
        setSelected(item)
    }, [setSelected])

    useEffect(() => {
        if (data) {
            setAdverts(data);
        }
    }, [data])

    return {
        isLoading: !error && !adverts,
        error: error,
        adverts,
        selected,
        setSelected: selectHandler,
        setAdverts,
        all: data ?? []
    }
}
