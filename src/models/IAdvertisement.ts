import {IStatus} from "./IStatus";
import {IData} from "./IData";

export interface IAdvertisement {
    buy: boolean,
    city: string,
    data: IData,
    first_date: string,
    good_id: string,
    house: boolean,
    id: number,
    iris: string,
    last_date: string,
    meter_square: number,
    position: {
        lat: number,
        lng: number
    },
    price: number,
    rooms: number,
    surface: number
}
