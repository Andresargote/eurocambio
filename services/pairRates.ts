export interface Currency {
    name: string;
    symbol: string;
}

export interface PairRate {
    name: string
    entranceCurrency: Currency;
    departureCurrency: Currency;
    price: number;
}

