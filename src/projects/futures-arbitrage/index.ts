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
        fundingSpread: new BigNumber(result.fundingSpread || 0).toNumber(),
        feePercentage: new BigNumber(result.feePercentage || 0).toNumber(),
        exchangeFrom: result.exchangeFrom,
        exchangeTo: result.exchangeTo,
        exchangeFromDuration: new BigNumber(result.exchangeFromDuration || 0).toNumber(),
        exchangeToDuration: new BigNumber(result.exchangeToDuration || 0).toNumber(),
        buyPriceFrom: new BigNumber(result.buyPriceFrom || 0).toNumber(),
        buyPriceTo: new BigNumber(result.buyPriceTo || 0).toNumber(),
        network: result.network || '',
        totalBuyUSD: new BigNumber(result.totalBuyUSD || 0).toNumber(),
        totalSellUSD: new BigNumber(result.totalSellUSD || 0).toNumber(),
        contract: result.contract || '',
    }
}

export default {
    type: "futures-arbitrage",
    provider: {
        ip: "0.0.0.0",
        handler,
    },
}
