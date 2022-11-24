export function getCurrencyFormat(amount: number, currencySymbol: string, prefix: boolean = false) {
    return `${prefix ? currencySymbol : ""}${amount.toLocaleString('en-US', {maximumFractionDigits: 2})}${!prefix ? currencySymbol : ""}`
}

export const fetcher = (...args: any) => fetch(args).then(res => res.json());
