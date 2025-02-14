import BigNumber from "bignumber.js"
import { fixJsonString } from "../../utils/fixJsonString";
import { v5 } from "uuid";

export async function handler(data: Record<string, any>) {
	if (!data?.content) {
		return "error"
	}

	const jsonStartIndex = data.content.indexOf("{");
	const jsonEndIndex = data.content.lastIndexOf("}") + 1;
	const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
	const result = JSON.parse(fixJsonString(jsonString));

	console.log(result)

	return {
		key: v5(data.key, v5.URL),
		type: "arbitrage",
		variant: result.variant.toUpperCase().replace('CEX', 'FUTURES'),
		symbol: result.symbol,
		exchangeFrom: result.exchangeFrom,
		exchangeTo: result.exchangeTo,
		buyPriceFrom: new BigNumber(result.buyPriceFrom).toNumber(),
		buyPriceTo: new BigNumber(result.buyPriceTo).toNumber(),
		totalBuyUSD: new BigNumber(result.totalBuyUSD).toNumber(),
		totalSellUSD: new BigNumber(result.totalSellUSD).toNumber(),
		network: result.network,
		spread: new BigNumber(result.spread).toNumber(),
		contract: result.contract
	}
}

export default {
	type: "0futures-arbitrage",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
