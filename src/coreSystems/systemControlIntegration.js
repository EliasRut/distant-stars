const { getStarSystemName, getCurrentYear, allowMainSystemControl } = require("../bridgeControl");
const { keepSubSystemOnline, getTemperatureWithUnit, calculatePowerRequirements } = require("../lifeSupport");

const starSystem = getStarSystemName();
const currentStarYear = getCurrentYear();
const hasSystemControl = allowMainSystemControl();

const isStarSystemCorrect = starSystem && starSystem === 'Simia Prime';
const isCurrentStarYearCorrect = currentStarYear && currentStarYear === 2722;

const areBridgeSystemsOnline = isStarSystemCorrect
	&& isCurrentStarYearCorrect
	&& hasSystemControl;
const bridgeSystemStatus = areBridgeSystemsOnline ? 'online' : 'offline';

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

const handleEvaluationOutput = (evaluationList) => {
	evaluationList.forEach((evaluation) => {
		console.log(`    ${evaluation[0]}`.padEnd(45, '.') + ` ${evaluation[1] ? 'correct' : 'incorrect'}`);
		if (!evaluation[1]) {
			console.log(evaluation[2]);
		}
	});
}

const isLifeSupportOnline = arePowerRequirementsCorrect && 
	areCorrectSubSystemsOnline &&
	areTemperaturesCorrect;
const lifeSupportStatus = isLifeSupportOnline ? 'online' : 'offline';
const isMainReactorOnline = false;
const mainReactorStatus = isMainReactorOnline ? 'online' : 'offline';
const areThrusterOnline = false;
const thrusterStatus = areThrusterOnline ? 'online' : 'offline';
const areNavigationSystemsOnline = false;
const navigationSystemStatus = areNavigationSystemsOnline ? 'online' : 'offline';
const areScannersOnline = false;
const scannerStatus = areScannersOnline ? 'online' : 'offline';
const areDeflectorShieldsOnline = false;
const deflectorShieldStatus = areDeflectorShieldsOnline ? 'online' : 'offline';
const areTargetingSystemsOnline = false;
const targetingSystemStatus = areTargetingSystemsOnline ? 'online' : 'offline';

const seperatorLine = '===========================================================';

console.log(seperatorLine);
console.log('  Main system check');
console.log(seperatorLine);
console.log(`  Main computer systems...................... online`);
console.log(`  Backup power systems....................... online`);
// First session
console.log(`  Bridge systems............................. ${bridgeSystemStatus}`)
console.log(`  Life support............................... ${lifeSupportStatus}`);
// Second session
console.log(`  Main Reactor............................... ${mainReactorStatus}`);
console.log(`  Thrusters.................................. ${thrusterStatus}`);
// Third session
console.log(`  Navigation systems......................... ${navigationSystemStatus}`);
console.log(`  Scanners................................... ${scannerStatus}`);
// Fourth session
console.log(`  Deflector shields.......................... ${deflectorShieldStatus}`);
console.log(`  Targeting systems.......................... ${targetingSystemStatus}`);

console.log();
console.log(seperatorLine);
console.log('  Starting failed subsytem trace');

if (!areBridgeSystemsOnline) {
	console.log('  Tracing bridge systems');
	console.log(seperatorLine);
	console.log(`  Critical system access..................... ${hasSystemControl ? 'granted' : 'denied'}`);
	console.log(`  Telemetry data............................. ${isStarSystemCorrect ? 'found' : 'missing'}`);
	console.log(`  Ship clocks................................ ${isCurrentStarYearCorrect ? 'consistent' : 'inconsistent'}`);
}
else if (!isLifeSupportOnline) {
	console.log('  Tracing life support systems');
	console.log(seperatorLine);
	console.log(`  Power requirements......................... ${arePowerRequirementsCorrect ? 'met' : 'not matching output'}`);
	if (!arePowerRequirementsCorrect) {
		handleEvaluationOutput(powerRequirementEvaluations);
	}	
	console.log(`  Subsystem power draw....................... ${areCorrectSubSystemsOnline ? 'normal' : 'outside norm'}`);
	if (arePowerRequirementsCorrect && !areCorrectSubSystemsOnline) {
		handleEvaluationOutput(subSystemsEvaluations);
	}
	console.log(`  Temperature ranges......................... ${areTemperaturesCorrect ? 'optimal' : 'suboptimal'}`);
	if (arePowerRequirementsCorrect && areCorrectSubSystemsOnline && !areTemperaturesCorrect) {
		handleEvaluationOutput(temperatureEvaluations);
	}
}
else if (!isMainReactorOnline) {

}
else if (!areThrusterOnline) {

}
else if (!areNavigationSystemsOnline) {

}
else if (!areScannersOnline) {

}
else if (!areDeflectorShieldsOnline) {

}
else if (!areTargetingSystemsOnline) {

}

console.log('\n\nShip systems shutting down\n\n');
