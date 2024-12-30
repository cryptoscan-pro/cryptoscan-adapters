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
		variant: 'bridge',
		symbol: result.symbol || '',
        spread: new BigNumber(result.spread).toNumber(),
        from: result.from || '',
        to: result.to || '',
        networkFrom: result.networkFrom || '',
        networkTo: result.networkTo || '',
        liquidityFrom: result.liquidityFrom || '',
        liquidityTo: result.liquidityTo || ''
	}
}

export default {
	type: "bridge-arbitrage",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
