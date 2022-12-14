import {IAdvertisement} from "../models/IAdvertisement";


class DataService {

    /**
     * It's supposed to manage everything related to data that I get from Lokimo API
     * @param data
     */
    getData(data: Partial<IAdvertisement>[]): Partial<IAdvertisement>[] {
        return data.filter(item => item.price && item?.price > 0);
    }

}

export default new DataService();
