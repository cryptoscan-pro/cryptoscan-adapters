import BigNumber from "bignumber.js"
import { fixJsonString } from "../../utils/fixJsonString";
import { v5 } from "uuid";

export async function handler(data: Record<string, any>) {
    if (!data?.content) {
        return "error"
    }

    const jsonStartIndex = data.content.indexOf("{");
    const jsonEndIndex = data.content.lastIndexOf("}") + 1;
    const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
    const result = JSON.parse(fixJsonString(jsonString));

    console.log(result);

    return {
        key: v5(data.key, v5.URL),
        type: "arbitrage",
        variant: 'futures-futures',
        symbol: result.symbol,
        spread: new BigNumber(result.spread).toNumber(),
        fundingSpread: new BigNumber(result.fundingSpread).toNumber(),
        feePercentage: new BigNumber(result.feePercentage).toNumber(),
        exchangeFrom: result.exchangeFrom,
        exchangeTo: result.exchangeTo,
        exchangeFromDuration: new BigNumber(result.exchangeFromDuration).toNumber(),
        exchangeToDuration: new BigNumber(result.exchangeToDuration).toNumber()
    }
}

export default {
    type: "cex-futures-arbitrage",
    provider: {
        ip: "0.0.0.0",
        handler,
    },
}
