import { v5 } from "uuid";

async function handler({ id, ...data }: Record<string, any>) {
	return {
		key: v5(id, v5.URL),
		...data,
	};
}

export default {
	type: "networks",
	provider: {
		ip: "0.0.0.0",
		handler,
	},
}
