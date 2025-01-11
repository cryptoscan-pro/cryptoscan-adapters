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
		symbolFrom: result.symbolFrom?.replace('#', '') || '',
		symbol: result.symbol?.replace('#', '') || '',
		changeType: 'price',
		change: new BigNumber(result.change || result.priceChange || 0).toNumber(),
		interval: result.interval || result.duration || '',
		price: new BigNumber(result.price || 0).toNumber(),
		volume24h: new BigNumber(result.volume24h || 0).toNumber(),
		volume1h: new BigNumber(result.volume1h || 0).toNumber(),
		volume: new BigNumber(result.volume || 0).toNumber(),
		bidsUsd: new BigNumber(result.bidsUsd || 0).toNumber(),
		asksUsd: new BigNumber(result.asksUsd || 0).toNumber(),
		liquidity: new BigNumber(result.liquidity || 0).toNumber(),
		priceChange5m: new BigNumber(result.priceChange5m || 0).toNumber(),
		priceChange6h: new BigNumber(result.priceChange6h || 0).toNumber(),
		priceChange24h: new BigNumber(result.priceChange24h || 0).toNumber(),
		contract: result.contract || '',
		days: result.days || 0,
		type: 'activity',
		variant: result.contract ? 'dex' : 'cex',
	}
}

export default {
	type: "activity",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
