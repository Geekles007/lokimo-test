import {IPoint} from "../models/IPoint";

/**
 * Little function to manage money/price format
 * @param amount
 * @param currencySymbol
 * @param prefix
 */
export function getCurrencyFormat(amount: number, currencySymbol: string, prefix: boolean = false) {
    return `${prefix ? currencySymbol : ""}${amount.toLocaleString('en-US', {maximumFractionDigits: 2})}${!prefix ? currencySymbol : ""}`
}

export const fetcher = (...args: any) => fetch(args).then(res => res.json());

/**
 * Function to check if selected points are within the radius in kilometer or near
 * @param pointToCheck
 * @param centerPoint
 * @param km
 */
export const areCoordinatesAreInside = (pointToCheck: IPoint, centerPoint: IPoint, km: number) => {
    const R = 6378;
    const dLat = calculateRadius(centerPoint.lat - pointToCheck.lat);
    const dLon = calculateRadius(centerPoint.lng - pointToCheck.lng);
    const lat1 = calculateRadius(pointToCheck.lat);
    const lat2 = calculateRadius(centerPoint.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c <= km;
}

/**
 * Calculate the radius used to check coordinates match
 * @param value
 */
function calculateRadius(value: number) {
    return (value * Math.PI) / 180;
}
