import { v5 } from "uuid"

function handler(data: Record<string, any>) {
    return {
        key: v5(data.key, v5.URL),
        from: data.from,
        to: data.to,
        groupKey: data.groupKey,
        field: data.field,
        type: 'relations',
    }
}

export default {
	type: "relations",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
