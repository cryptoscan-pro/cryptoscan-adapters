import { v5 } from "uuid";
import { BigNumber } from "bignumber.js";
import { fixJsonString } from "../../utils/fixJsonString";

const TYPE = "binance-liquidations";
const PROVIDER_IP = "178.20.208.99";

export async function handler(data: Record<string, any>) {
	if (!data?.content) {
		return
	}

	console.log(data)
	const jsonStartIndex = data.content.indexOf("{");
	const jsonEndIndex = data.content.indexOf("}") + 1;
	const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
	const result = JSON.parse(fixJsonString(jsonString));

	return {
		...result,
		key: v5(TYPE + data.key, v5.URL),
		price: new BigNumber(result.price).toNumber(),
		usd: new BigNumber(result.usd).toNumber(),
		type: 'liquidations',
		exchange: 'binance',
	}
}

export default {
	type: TYPE,
	provider: {
		ip: PROVIDER_IP,
		handler,
	},
}
