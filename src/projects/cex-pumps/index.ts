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
		price: new BigNumber(result.price).toNumber(),
		volume24h: new BigNumber(result.volume24h).toNumber(),
		volumeChange24h: result.volumeChange24h,
	  volume: result.volume,
		bidsUsd: result.bidsUsd,
		asksUsd: result.asksUsd,
		type: 'price-activity',
		variant: 'cex',
	}
}

export default {
	type: "cex-pumps",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
