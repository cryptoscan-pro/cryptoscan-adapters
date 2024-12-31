import { v5 } from "uuid";
import { BigNumber } from "bignumber.js";
import { fixJsonString } from "../../utils/fixJsonString";

export async function handler(data: Record<string, any>) {
    if (!data?.content) {
        return
    }

    const jsonStartIndex = data.content.indexOf("{");
    const jsonEndIndex = data.content.indexOf("}") + 1;
    const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
    const result = JSON.parse(fixJsonString(jsonString));

    return {
        key: v5(data.key, v5.URL),
        liquidationPrice: new BigNumber(result?.liquidationPrice || 0).toNumber(),
        tokenAmount: new BigNumber(result?.tokenAmount || 0).toNumber(),
        usdValue: new BigNumber(result?.usdValue || 0).toNumber(),
        protocol: result.protocol,
        chain: result.chain,
        address: result.address,
        url: result.url,
        currentPrice: new BigNumber(result?.currentPrice || 0).toNumber(),
        asset: result.asset,
        type: 'liquidation'
    }
}

export default {
    type: "liquidation-position",
    provider: {
        ip: "178.20.208.99",
        handler,
    },
}
