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
    exchange: result.exchange,
		network: result.network,
		price: new BigNumber(result.price).toNumber(),
		priceUsd: new BigNumber(result.price_usd).toNumber(),
		amount: new BigNumber(result.amount).toNumber(),
		liquidity: new BigNumber(result.liquidity).toNumber(),
		type: 'listings',
		variant: 'dex',
	}
}

export default {
	type: "dex-listings",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
