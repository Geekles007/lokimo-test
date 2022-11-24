import {fetcher} from "../helpers";
import useSWR from "swr";
import {TResponse} from "../models/IResponse";
import {DATA_API} from "../constants";
import {useCallback, useEffect, useState} from "react";
import PaginateService from "../services/PaginateService";
import {IPaginate} from "../models/IPaginate";
import {IAdvertisement} from "../models/IAdvertisement";

export const useAdverts = (url: string): TResponse<Partial<IPaginate> | undefined> => {
    const { data, error } = useSWR(`${DATA_API}/${url}`, fetcher);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<Partial<IAdvertisement>>();
    const [paginate, setPaginate] = useState<Partial<IPaginate>>();
    const [radius, setRadius] = useState<number | undefined>(1);

    const selectHandler = useCallback((item?: Partial<IAdvertisement>) => {
        setSelected(item)
    }, [setSelected])

    useEffect(() => {
        if(data) {
            setPaginate(PaginateService.getPaginateData(data, paginate?.data, page));
        }
    }, [data, page])

    useEffect(() => {
        if(radius) {
            console.log("radius")
        }
    }, [radius])

    return {
        isLoading: !error && !paginate,
        error: error,
        page,
        setPage,
        paginate,
        selected,
        setSelected: selectHandler,
        setRadius,
        radius
    }
}
