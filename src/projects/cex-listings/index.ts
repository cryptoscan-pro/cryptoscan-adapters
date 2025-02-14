import { v5 } from "uuid";
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
		exchange: result?.exchange || '',
		pairLink: result?.pairLink || '',
		link: result?.link || '',
		isApiListing: result?.isApiListing === true ? 1 : 0,
		isFuturesListing: result?.isFuturesListing === true ? 1 : 0,
		isWillBeAdded: result?.isWillBeAdded === true ? 1 : 0,
		type: 'listings',
		variant: 'cex',
	}
}

export default {
	type: "cex-listings",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
