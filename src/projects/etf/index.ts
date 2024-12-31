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

    console.log(result);

    return {
        key: v5(data.key, v5.URL),
        ticker: result.ticker,
        asset: result.asset,
        issuer: result.issuer,
        etf_name: result.etf_name,
        custodian: result.custodian,
        pct_fee: new BigNumber(result?.pct_fee || 0).toNumber(),
        flows: new BigNumber(result?.flows || 0).toNumber(),
        aum: new BigNumber(result?.aum || 0).toNumber(),
        volume: new BigNumber(result?.volume || 0).toNumber(),
        chain: result.chain,
        type: 'etf'
    }
}

export default {
    type: "etf-data",
    provider: {
        ip: "178.20.208.99",
        handler,
    },
}
