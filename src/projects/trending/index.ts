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
		symbol: result.symbol,
		reference: result?.reference || '',
        contract: result?.contract || '',
        change: new BigNumber(result?.change || 0).toNumber(),
		type: 'trending',
	}
}

export default {
	type: "trending",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
