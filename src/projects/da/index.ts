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
		amount: new BigNumber(result.amount || 0).toNumber() || 0,
		symbolFrom: result.symbolFrom.replace('#', '') || '',
		symbol: result.symbol.replace('#', '') || '',
		contract: result.contract || '',
		change: new BigNumber(result.priceChange5m || result.change || 0).toNumber(),
		priceChange5m: new BigNumber(result.priceChange5m || result.change || 0).toNumber(),
		priceChange6h: new BigNumber(result.priceChange6h || 0).toNumber(),
		priceChange24h: new BigNumber(result.priceChange24h || 0).toNumber(),
		liquidity: new BigNumber(result.liquidity || 0).toNumber(),
		price: new BigNumber(result.price || 0).toNumber(),
		volume24h: new BigNumber(result.volume24h | 0).toNumber(),
		volume1h: new BigNumber(result.volume1h || 0).toNumber(),
		type: 'activity',
		variant: 'dex',
	}
}

export default {
	type: "da",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
