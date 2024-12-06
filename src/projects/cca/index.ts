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
		exchange: result.exchange,
		symbol: result.symbol,
		usd: new BigNumber(result.usd).toNumber(),
		price: new BigNumber(result.price).toNumber(),
		interval: result.interval,
		priceChange: new BigNumber(result.priceChange).toNumber(),
		volumeChange: new BigNumber(result.volumeChange).toNumber(),
		volume: new BigNumber(result.volume).toNumber(),
		lastAlert: result.lastAlert,
		link: result.link,
		type: 'activity',
		variant: 'cex',
	}
}

export default {
	type: "cca",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
