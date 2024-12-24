import { v5 } from "uuid";

function handler({ id, ...data }: Record<string, any>) {
	return {
		key: v5(id, v5.URL),
		symbol: data.symbol || '',
		exchange: data.exchange || '',
		text: data.text || '',
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
