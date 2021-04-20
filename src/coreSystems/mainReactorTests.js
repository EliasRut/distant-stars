const {
	getTotalPowerOutput,
	isPowerOutputInTolerance,
	performEmergencyShutdownIfNecessary,
	adjustReactorSystems,
	runAdvancedSimulations
} = require("../mainReactor");

const {
	restartReactor,
	resetCounts,
	shutDownReactor,
	getIsReactorRunning,
	getMainReactorOutput,
	getBackupReactorOutput,
	getPowerDraw,
	setMainReactorOutput,
	setBackupReactorOutput,
	setPowerDraw
} = require('./reactorControl');

// Main Reactor Output, Backup Reactor Output, Total expected output
const powerCalculationTests = [
	['Maximum output', 45, 10, 55],
	['Balanced output', 28, 7, 35],
	['All primary', 42, 0, 42],
	['All secondary', 0, 10, 10],
	['Low output', 8, 4, 12],
];

const powerCalculationEvaluations = powerCalculationTests.map((dataSet) => {
	setMainReactorOutput(dataSet[1]);
	setBackupReactorOutput(dataSet[2]);
	const returnValue = getTotalPowerOutput();
	const isValid = returnValue === dataSet[3];
	return [
		dataSet[0],
		isValid,
		isValid ? '' :
			`      Main Reactor: ${dataSet[1]}, Secondary Reactor: ${dataSet[2]}` + 
			`\n      Return value: ${dataSet[3]}`
	];
});

const arePowerCalculationsCorrect = powerCalculationEvaluations.every((calculations) => {
	return calculations[1];
});

// Main Reactor Output, Backup Reactor Output, Expected Output, should be in tolerance
const powerOutputToleranceTests = [
	['Maximum output, high usage', 45, 10, 55, true],
	['Maximum output, low usage', 45, 10, 25, false],
	['Balanced output, high usage', 28, 7, 37, true],
	['Balanced output, low usage', 28, 7, 15, false],
	['All primary, high usage', 42, 0, 41, false],
	['All primary, low usage', 42, 0, 27, false],
	['All secondary, high usage', 0, 10, 12, true],
	['All secondary, low usage', 0, 10, 6, true],
	['Low output, high usage', 8, 4, 12, true],
	['Low output, low usage', 8, 4, 4, false],
];

const powerOutputToleranceEvaluations = powerOutputToleranceTests.map((dataSet) => {
	setMainReactorOutput(dataSet[1]);
	setBackupReactorOutput(dataSet[2]);
	setPowerDraw(dataSet[3]);
	const returnValue = isPowerOutputInTolerance();
	const isValid = returnValue === dataSet[4];
	return [
		dataSet[0],
		isValid,
		isValid ? '' :
			`      Main Reactor: ${dataSet[1]}, Secondary Reactor: ${dataSet[2]}, Power draw: ${dataSet[3]}` + 
			`\n      Return value: ${dataSet[4]}`

	];
});

const arePowerToleranceCalculationsCorrect = powerOutputToleranceEvaluations.every((calculations) => {
	return calculations[1];
});

// Main Reactor Output, Backup Reactor Output, Expected Output, is Reactor shut down
const emergencyShutdownTests = [
	['Maximum output, high usage', 45, 10, 55, true],
	['Maximum output, low usage', 45, 10, 25, false],
	['Balanced output, high usage', 28, 7, 37, true],
	['Balanced output, low usage', 28, 7, 15, false],
	['All primary, high usage', 42, 0, 41, false],
	['All primary, low usage', 42, 0, 27, false],
	['All secondary, high usage', 0, 10, 12, true],
	['All secondary, low usage', 0, 10, 6, true],
	['Low output, high usage', 8, 4, 12, true],
	['Low output, low usage', 8, 4, 4, false],
];

const emergencyShutdownEvaluations = emergencyShutdownTests.map((dataSet) => {
	setMainReactorOutput(dataSet[1]);
	setBackupReactorOutput(dataSet[2]);
	setPowerDraw(dataSet[3]);
	restartReactor();
	performEmergencyShutdownIfNecessary();
	const isReactorRunning = getIsReactorRunning();
	const isValid = isReactorRunning === dataSet[4];
	return [
		dataSet[0],
		isValid,
		isValid ? '' :
			`      Main Reactor: ${dataSet[1]}, Secondary Reactor: ${dataSet[2]}, Power draw: ${dataSet[3]}` + 
			`\n      Is main reactor running: ${isReactorRunning}. Should it be running: ${dataSet[4]}.`

	];
});

const areEmergencyShutdownEvaluationsCorrect = emergencyShutdownEvaluations
.every((calculations) => {
	return calculations[1];
});

// Main Reactor Output, Backup Reactor Output, Expected Output
const powerAdjustmentTests = [[
	'Simulation 1: Interplanetary flight', 2, 2, 4, true, [
		['Warming up thrusters', 12, true],
		['Setting thrusters to half power', 18, true],
		['Setting thrusters to full power', 24, true],
		['Powering down thrusters', 14, true],
		['Shutting down thrusters', 4, true],
	]], [
	'Simulation 2: Emergency shutdown after flare', 2, 2, 4, true, [
		['Warming up thrusters', 12, true],
		['Setting thrusters to half power', 18, true],
		['Setting thrusters to full power', 24, true],
		['Simulating unshielded solar flare', 4, false],
	]], [
	'Simulation 3: Highly dynamic power draw', 2, 2, 4, false, [
		['Warming up thrusters', 12, true],
		['Setting thrusters to full power', 24, true],
		['Quickly powering down thrusters', 10, true],
		['Shutting down thrusters', 4, true],
	]], [
	'Simulation 4: Full utilization', 25, 8, 33, false, [
		['Ramping up deflector shielding', 45, true],
		['Setting thrusters to 130%', 52, true],
		['Engaging reactor to 100%', 60, true],
	]
]];

const powerAdjustmentEvaluations = powerAdjustmentTests
	.filter((simulation) => {
		const isRequired = simulation[4];
		return isRequired || runAdvancedSimulations;
	})
	.map((simulation) => {
	restartReactor();
	setMainReactorOutput(simulation[1]);
	setBackupReactorOutput(simulation[2]);
	setPowerDraw(simulation[3]);
	const isRequired = simulation[4];
	const steps = simulation[5];
	const stepEvaluations = steps.map((step) => {
		const [stepName, nextPowerDraw, expectReactorToBeRunning] = step;
		resetCounts();
		setPowerDraw(nextPowerDraw);
		adjustReactorSystems();
		const totalOutput = getTotalPowerOutput();
		const isReactorRunning = getIsReactorRunning();
		const isValid = totalOutput >= nextPowerDraw && isReactorRunning === expectReactorToBeRunning;
		return [isValid, isValid ? `        ${stepName} succeeded.` :
				`        ${stepName} failed.\n` +
				`          Power Draw: ${nextPowerDraw}.\n` +
				`          Output: ${totalOutput}. \n`+
				`          Main reactor is ` +(isReactorRunning ? 'online' : 'offline') + 
				', should be ' + (expectReactorToBeRunning ? 'online' : 'offline')
		];
	});

	const isSimulationValid = stepEvaluations.every((step) => step[0]);
	const stepTexts = stepEvaluations.map((step) => step[1]).join('\n');

	return [
		simulation[0],
		isSimulationValid,
		isSimulationValid ? '' :
			`      Tracing simulation.\n${stepTexts}`
	];
});

const arePowerAdjustmentEvaluationsCorrect = powerAdjustmentEvaluations
.every((calculations) => {
	return calculations[1];
});

const isMainReactorOnline = arePowerCalculationsCorrect
	&& arePowerToleranceCalculationsCorrect
	&& areEmergencyShutdownEvaluationsCorrect
	&& arePowerAdjustmentEvaluationsCorrect;

module.exports = {
	powerCalculationTests,
	powerCalculationEvaluations,
	arePowerCalculationsCorrect,
	powerOutputToleranceTests,
	powerOutputToleranceEvaluations,
	arePowerToleranceCalculationsCorrect,
	emergencyShutdownTests,
	emergencyShutdownEvaluations,
	areEmergencyShutdownEvaluationsCorrect,
	powerAdjustmentTests,
	powerAdjustmentEvaluations,
	arePowerAdjustmentEvaluationsCorrect,
	isMainReactorOnline
}