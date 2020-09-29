const { keepSubSystemOnline, getTemperatureWithUnit, calculatePowerRequirements } = require("../lifeSupport");

// Lighting, Heating, Airflow
const powerRequirementTests = [
	['Bridge', 12, 4, 7, 23],
	['Corridors', 8, 14, 10, 32],
	['Hangar', 2, 6, 22, 30],
	['Living quarters', 9, 27, 13, 49],
];

const powerRequirementEvaluations = powerRequirementTests.map((dataSet) => {
	const returnValue = calculatePowerRequirements(dataSet[1], dataSet[2], dataSet[3]);
	const isValid = returnValue === dataSet[4];
	return [
		dataSet[0],
		isValid,
		isValid ? '' :
			`      Parameters: ${dataSet[1]}, ${dataSet[2]}, ${dataSet[3]}` + 
			`\n      Return value: ${returnValue}`
	];
});

const arePowerRequirementsCorrect = powerRequirementEvaluations.every((calculations) => {
	return calculations[1];
});

// isCriticalSystem, hasHighEnergyRequirements
const subSystemTest = [
	['Bridge interfaces', true, false, true],
	['Hydroponic bays', false, true, false],
	['CO2 scrubbers', true, true, true],
	['Escape route lighting', false, false, true]
];

const subSystemsEvaluations = subSystemTest.map((dataSet) => {
	const returnValue = keepSubSystemOnline(dataSet[1], dataSet[2]);
	const isValid = returnValue === dataSet[3];
	return [
		dataSet[0],
		isValid,
		isValid ? '' :
			`      Parameters: ${dataSet[1]}, ${dataSet[2]}\n      Return value: ${returnValue}`

	];
});

const areCorrectSubSystemsOnline = subSystemsEvaluations.every((calculations) => {
	return calculations[1];
});

// Conversion is: x°C =  x + 273.15°K
const temperatureTests = [
	['Bridge', 297.15, '24°C'],
	['Corridors', 289.65, '16.5°C'],
	['Hangar', 287.15, '14°C'],
	['Fluid seperation', 273.15, '0°C'],
	['Food storage', 266.15, '-7°C'],
];

const temperatureEvaluations = temperatureTests.map((dataSet) => {
	const temperatureResult = getTemperatureWithUnit(dataSet[1]);
	if (!temperatureResult) {
		return [dataSet[0], false];
	}
	const normalizedValue = temperatureResult
		.replace(/ /ig, '')
		.replace(',', '.')
		.toUpperCase();
	const isValid = normalizedValue === dataSet[2];
	return [
		dataSet[0],
		isValid,
		isValid ? '' :
			`      Parameters: ${dataSet[1]}\n      Return value: ${temperatureResult}`
	];
});

const areTemperaturesCorrect = temperatureEvaluations.every((calculations) => {
	return calculations[1];
});

const isLifeSupportOnline = arePowerRequirementsCorrect && 
	areCorrectSubSystemsOnline &&
	areTemperaturesCorrect;

module.exports = {
	arePowerRequirementsCorrect,
	powerRequirementEvaluations,
	areCorrectSubSystemsOnline,
	subSystemsEvaluations,
	areTemperaturesCorrect,
	temperatureEvaluations,
	isLifeSupportOnline
}