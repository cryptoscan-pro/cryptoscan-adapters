import { v5 } from "uuid";
import { BigNumber } from "bignumber.js";
import { fixJsonString } from "../../utils/fixJsonString";

export async function handler(data: Record<string, any>) {
	return {
    ...data,
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
