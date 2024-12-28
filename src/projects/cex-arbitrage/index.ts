import BigNumber from "bignumber.js"
import { fixJsonString } from "../../utils/fixJsonString";
import { v5 } from "uuid";

export async function handler(data: Record<string, any>) {
	const variantFrom = data.exchangeFrom.includes('futures') ? 'futures' : 'cex';
	const variantTo = data.exchangeTo.includes('futures') ? 'futures' : 'cex';
	const variant = variantFrom + '-' + variantTo;
	return {
		key: v5(data.key, v5.URL),
		type: "arbitrage",
		variant,
		symbol: data.symbol,
		exchangeFrom: data.exchangeFrom,
		exchangeTo: data.exchangeTo,
		buyPriceFrom: new BigNumber(data.buyPriceFrom).toNumber(),
		buyPriceTo: new BigNumber(data.buyPriceTo).toNumber(),
		totalBuyUSD: new BigNumber(data.totalBuyUSD).toNumber(),
		totalSellUSD: new BigNumber(data.totalSellUSD).toNumber(),
		network: data.network,
		format: data.format,
		spread: new BigNumber(data.spread).toNumber(),
		contract: data?.contract
	}
}

export default {
	type: "cex-arbitrage",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
