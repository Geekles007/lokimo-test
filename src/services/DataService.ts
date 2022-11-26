import {IAdvertisement} from "../models/IAdvertisement";
import useSWR from "swr";
import {DATA_API} from "../constants";
import {fetcher} from "../helpers";


class DataService {

    /**
     * It's supposed to manage everything related to data that I get from Lokimo API
     * @param url
     */
    getData(url: string): IAdvertisement[] {
        const {data, error} = useSWR<IAdvertisement[]>(`${DATA_API}/${url}`, fetcher);
        if(!data || error) {
            return [];
        }
        console.log(url, data);
        return data;
    }

}

export default new DataService();
