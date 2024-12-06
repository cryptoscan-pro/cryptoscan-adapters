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
		amount: new BigNumber(result.amount).toNumber(),
		usd: new BigNumber(result.usd).toNumber(),
		from: result.from,
		to: result.to,
		exchange: result.exchange,
		type: 'transfers',
		variant: 'dex',
	}
}

export default {
	type: "dex-transfers",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
