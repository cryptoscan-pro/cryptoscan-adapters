import BigNumber from "bignumber.js"

export async function handler(data: Record<string, any>) {
	if (!data?.content) {
		return
	}

	const jsonStartIndex = data.content.indexOf("{");
	const jsonEndIndex = data.content.indexOf("}") + 1;
	const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
	const result = JSON.parse(fixJsonString(jsonString));

	return {
		type: "arbitrage",
		variant: result.variant,
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
	type: "dex-arbitrage",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
