const { getStarSystemName, getCurrentYear, allowMainSystemControl } = require("../bridgeControl");

const starSystem = getStarSystemName();
const currentStarYear = getCurrentYear();
const hasSystemControl = allowMainSystemControl();

const isStarSystemCorrect = starSystem && starSystem === 'Simia Prime';
const isCurrentStarYearCorrect = currentStarYear && currentStarYear === 2722;

const areBridgeSystemsOnline = isStarSystemCorrect
	&& isCurrentStarYearCorrect
	&& hasSystemControl;

module.exports = {
	starSystem,
	currentStarYear,
	hasSystemControl,
	isStarSystemCorrect,
	isCurrentStarYearCorrect,
	areBridgeSystemsOnline
}