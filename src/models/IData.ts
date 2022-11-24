import {IStatus} from "./IStatus";

export interface IData {
    bathroomsQuantity: number,
    bedroomsQuantity: number,
    city: string,
    hasCellar: boolean,
    hasFirePlace: boolean,
    hasGarden: boolean,
    hasPool: boolean,
    hasSeparateToilet: boolean,
    hasTerrace: boolean,
    heating: string,
    link: string,
    newProperty: boolean,
    parkingPlacesQuantity: number,
    priceWithoutFees: number,
    publicationDate: string,
    reference: string,
    status: IStatus,
    title: string,
    toiletQuantity: number,
    transactionType: string,
    yearOfConstruction: number
}
