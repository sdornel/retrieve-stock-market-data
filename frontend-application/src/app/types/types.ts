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
    close: string,
}

export interface CandlestickData {
    meta: Metadata,
    status: string,
    values: Array<CandlestickIndexValue>,
}