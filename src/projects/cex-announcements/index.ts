import { v5 } from "uuid";
import { fixJsonString } from "../../utils/fixJsonString";

function handler({ id, ...data }: Record<string, any>) {
	if (!data?.content) {
		return
	}

	const jsonStartIndex = data.content.indexOf("{");
	const jsonEndIndex = data.content.indexOf("}") + 1;
	const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
	const result = JSON.parse(fixJsonString(jsonString));

	return {
		key: v5(data.key, v5.URL),
		symbol: result.symbol || '',
		exchange: result.exchange || '',
		text: result.text || '',
		type: 'announcements',
	};
}

export default {
	type: "announcements",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
