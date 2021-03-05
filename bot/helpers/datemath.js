function calculatePassedTime(amount, unit) {
	switch (unit) {
		case "second":
			return amount
		case "minute":
			return amount * 60;
		case "hour":
			return amount * 60 * 60;
		case "day":
			return amount * 60 * 60 * 24;
		case "week":
			return amount * 60 * 60 * 24 * 7;
		case "month":
			return amount * 60 * 60 * 24 * 7 * 4;
		case "year":
			return amount * 60 * 60 * 24 * 7 * 4 * 12;
		default: return new Date();
	}
}

module.exports = { calculatePassedTime }
