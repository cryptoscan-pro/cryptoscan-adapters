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
    ...result,
		key: v5(data.key, v5.URL),
		type: 'arbitrage-rates',
	}
}

export default {
	type: "arbitrage-rates",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
