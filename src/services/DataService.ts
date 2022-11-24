import {IAdvertisement} from "../models/IAdvertisement";

class DataService {

    getData(data: Partial<IAdvertisement>[]): Partial<IAdvertisement>[] {
        return data;
    }

}

export default new DataService();
