import { v5 } from "uuid";
import { BigNumber } from "bignumber.js";
import { fixJsonString } from "../../utils/fixJsonString";

/**
 * Interface describing the return object for activity-volume
 */
interface ActivityVolumeResponse {
    key: string;
    symbolFrom: string;
    symbol: string;
    amount: number;
    change: number;
    interval: string;
    price: number;
    volume24h: number;
    volume1h: number;
    volumeChange24h: number;
    volume: number;
    bidsUsd: number;
    asksUsd: number;
    liquidity: number;
    priceChange5m: number;
    priceChange6h: number;
    priceChange24h: number;
    changeType: 'volume';
    type: 'activity';
    variant: 'dex' | 'cex';
}

/**
 * Processes volume activity data
 * @param data - Input data
 * @param data.content - JSON string with data
 * @param data.key - Key for UUID generation
 * @returns {Promise<ActivityVolumeResponse | undefined>} Object with processed volume data or undefined if no content
 */
export async function handler(data: Record<string, any>): Promise<ActivityVolumeResponse | undefined> {
	if (!data?.content) {
		return
	}

	const jsonStartIndex = data.content.indexOf("{");
	const jsonEndIndex = data.content.indexOf("}") + 1;
	const jsonString = data.content.substring(jsonStartIndex, jsonEndIndex);
	const result = JSON.parse(fixJsonString(jsonString));

	return {
		key: v5(data.key, v5.URL),
		symbolFrom: result.symbolFrom?.replace('#', '') || '',
		symbol: result.symbol?.replace('#', '') || '',
		amount: new BigNumber(result.amount || 0).toNumber() || 0,
		change: new BigNumber(result.change || result.priceChange || 0).toNumber(),
		interval: result.interval || result.duration || '',
		price: new BigNumber(result?.price || 0).toNumber(),
		volume24h: new BigNumber(result?.volume24h || 0).toNumber(),
		volume1h: new BigNumber(result.volume1h || 0).toNumber(),
		volumeChange24h: new BigNumber(result?.volumeChange24h).toNumber(),
		volume: new BigNumber(result?.volume).toNumber(),
		bidsUsd: new BigNumber(result?.bidsUsd).toNumber(),
		asksUsd: new BigNumber(result?.asksUsd).toNumber(),
		liquidity: new BigNumber(result?.liquidity).toNumber(),
		priceChange5m: new BigNumber(result.priceChange5m || 0).toNumber(),
		priceChange6h: new BigNumber(result.priceChange6h || 0).toNumber(),
		priceChange24h: new BigNumber(result.priceChange24h || 0).toNumber(),
		changeType: 'volume',
		type: 'activity',
		variant: result.contract ? 'dex' : 'cex',
	}
}

export default {
	type: "activity-volume",
	provider: {
		ip: "178.20.208.99",
		handler,
	},
}
