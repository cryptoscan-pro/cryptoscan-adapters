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

	console.log(result)

	return {
		key: v5(data.key, v5.URL),
		symbol: result?.symbol,
        exchange: result?.exchange || '',
        change: new BigNumber(result?.change || 0).toNumber(),
        duration: result?.duration || '',
		change5m: new BigNumber(result?.change5m || 0).toNumber(),
		change15m: new BigNumber(result?.change15m || 0).toNumber(),
		change1h: new BigNumber(result?.change1h || 0).toNumber(),
		change5mUsd: new BigNumber(result?.change5mUsd || 0).toNumber(),
		change15mUsd: new BigNumber(result?.change15mUsd || 0).toNumber(),
		change1hUsd: new BigNumber(result?.change1hUsd || 0).toNumber(),
		priceChange5m: new BigNumber(result?.priceChange5m || 0).toNumber(),
		priceChange15m: new BigNumber(result?.priceChange15m || 0).toNumber(),
		priceChange1h: new BigNumber(result?.priceChange1h || 0).toNumber(),
		type: 'oi',
		variant: 'cex',
	}
}

export default {
	type: "oi-tracker",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
