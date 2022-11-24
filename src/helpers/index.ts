import {IPoint} from "../models/IPoint";

export function getCurrencyFormat(amount: number, currencySymbol: string, prefix: boolean = false) {
    return `${prefix ? currencySymbol : ""}${amount.toLocaleString('en-US', {maximumFractionDigits: 2})}${!prefix ? currencySymbol : ""}`
}

export const fetcher = (...args: any) => fetch(args).then(res => res.json());

export const checkIfInsideRadius = (pointToCheck: IPoint, centerPoint: IPoint, radius: number) => {
    const ky = 40000 / 360;
    const kx = Math.cos((Math.PI * (centerPoint?.lat ?? 0)) / 180.0) * ky;
    const dx = Math.abs((centerPoint?.lng ?? 0) - (pointToCheck?.lng ?? 0)) * kx;
    const dy = Math.abs((centerPoint?.lat ?? 0) - (pointToCheck?.lat ?? 0)) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
}
