import {IAdvertisement} from "../models/IAdvertisement";
import {IPaginate} from "../models/IPaginate";
import {DATA_LIMIT} from "../constants";

class PaginateService {

    getPaginateData(data: IAdvertisement[], currentList: IAdvertisement[] = [], page: number): Partial<IPaginate> {
        const totalPage = data?.length / DATA_LIMIT;
        const currentPosition = page * DATA_LIMIT;
        const paginate: Partial<IPaginate> = {
            page: page,
            count: data?.length ?? 0,
            totalPage: totalPage ?? 0,
            limit: DATA_LIMIT
        };

        return {
            ...paginate,
            data: [...currentList, ...data?.slice(currentPosition, currentPosition + DATA_LIMIT)]
        }
    }

}

export default new PaginateService();
