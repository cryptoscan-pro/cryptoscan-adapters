export async function handler(data: Record<string, any>) {
	return {
		type: "arbitrage",
		variant: data.variant,
		symbol: data.symbol,
		exchangeFrom: data.exchangeFrom,
    exchangeTo: data.exchangeTo,
    buyPriceFrom: data.buyPriceFrom,
    buyPriceTo: data.buyPriceTo,
    totalBuyUSD: data.totalBuyUSD,
    totalSellUSD: data.totalSellUSD,
    network: data.network,
    spread: data.spread,
    contract: data.contract
	}
}

export default {
	type: "dex-arbitrage",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
