import { v4 } from "uuid"

export default {
	type: "test",
	provider: {
		ip: "178.20.208.99",
		handler: () => {
            return {
                key: v4(),
                num: 1,
            }
        },
	},
}