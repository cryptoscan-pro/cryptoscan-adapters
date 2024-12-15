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
		symbol: result.symbol,
		price: new BigNumber(result?.price || 0).toNumber(),
		volume24h: new BigNumber(result?.volume24h || 0).toNumber(),
		volumeChange24h: new BigNumber(result?.volumeChange24h).toNumber(),
		volume: new BigNumber(result?.volume).toNumber(),
		bidsUsd: new BigNumber(result?.bidsUsd).toNumber(),
		asksUsd: new BigNumber(result?.asksUsd).toNumber(),
		type: 'price-activity',
		variant: 'cex',
	}
}

export default {
	type: "pumps",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
