import { v5 } from "uuid";
import { BigNumber } from "bignumber.js";

const TYPE = "bybit-liquidations";
const PROVIDER_IP = "178.20.208.99";

export async function handler(data: Record<string, string | number>) {
	if (!data?.content) {
		return
	}

	return {
		...data,
		key: v5(TYPE + data.key, v5.URL),
		price: new BigNumber(data.price).toNumber(),
		usd: new BigNumber(data.usd).toNumber(),
		type: 'liquidations',
		exchange: 'bybit',
	}
}

export default {
	type: TYPE,
	provider: {
		ip: PROVIDER_IP,
		handler,
	},
}
