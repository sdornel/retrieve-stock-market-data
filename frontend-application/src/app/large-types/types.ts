interface Metadata {
    currency: string,
    exchange: string,
    exchange_timezone: string,
    interval: string,
    mic_code: string,
    symbol: string,
    type: string,
}

interface CandlestickIndexValue {
    datetime: string,
    hightime: string,
    high: string,
    low: string,
    open: string,
    volume: string,
}

export interface CandlestickData {
    meta: Metadata | null,
    status: string | null,
    values: Array<CandlestickIndexValue>,
}