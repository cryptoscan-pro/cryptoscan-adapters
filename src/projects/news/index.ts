import { fixJsonString } from "../../utils/fixJsonString";
import { v5 } from "uuid";

export async function handler(data: Record<string, any>) {
	if (!data?.content) {
		return;
	}

	const jsonStartIndex = data.content.indexOf("{");
	const jsonEndIndex = data.content.indexOf("}") + 1;
	const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
	const result = JSON.parse(fixJsonString(jsonString));

	return {
		key: v5(data.key, v5.URL),
		type: "news",
		text: result.text,
		exchange: result?.exchange || '',
		symbol: result?.symbol || '',
		source: result?.source || '',
		link: result?.sourceLink || '',
	}
}

export default {
	type: "news",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
