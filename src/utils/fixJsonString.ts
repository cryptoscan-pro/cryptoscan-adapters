export function fixJsonString(jsonString: string) {
	return jsonString.replace(/:\s*"?(\d{1,3}(?:,\d{3})+)"?/g, (match, number) => {
		const fixedNumber = number.replace(/,/g, '');
		return match.replace(number, fixedNumber);
	});
}
