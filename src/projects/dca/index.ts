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
		usd: new BigNumber(result.usd).toNumber(),
		symbolFrom: result.symbolFrom,
		symbol: result.symbol,
		priceChange5m: new BigNumber(result.priceChange5m).toNumber(),
		priceChange6h: new BigNumber(result.priceChange6h).toNumber(),
		priceChange24h: new BigNumber(result.priceChange24h).toNumber(),
		type: 'activity',
		variant: 'dex',
	}
}

export default {
	type: "dca",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
