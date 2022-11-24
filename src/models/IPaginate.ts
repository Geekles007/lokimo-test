import {IAdvertisement} from "./IAdvertisement";

export interface IPaginate {
    count: number;
    data: IAdvertisement[];
    page: number;
    totalPage: number;
    limit: number;
}
