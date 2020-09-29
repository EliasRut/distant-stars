const { getStarSystemName, getCurrentYear, allowMainSystemControl } = require("../bridgeControl");
const { handleEvaluationOutput } = require("./outputUtilities");

const {
	arePowerRequirementsCorrect,
	powerRequirementEvaluations,
	areCorrectSubSystemsOnline,
	subSystemsEvaluations,
	areTemperaturesCorrect,
	temperatureEvaluations,
	// isLifeSupportOnline
} = require("./lifeSupportTests");

const {
	hasSystemControl,
	isStarSystemCorrect,
	isCurrentStarYearCorrect,
	// areBridgeSystemsOnline
} = require("./bridgeSystemTests");

const {
	powerCalculationEvaluations,
	arePowerCalculationsCorrect,
	powerOutputToleranceEvaluations,
	arePowerToleranceCalculationsCorrect,
	emergencyShutdownEvaluations,
	areEmergencyShutdownEvaluationsCorrect,
	powerAdjustmentEvaluations,
	arePowerAdjustmentEvaluationsCorrect,
	isMainReactorOnline
} = require("./mainReactorTests");

const areBridgeSystemsOnline = true;
const isLifeSupportOnline = true;

const bridgeSystemStatus = areBridgeSystemsOnline ? 'online' : 'offline';
const lifeSupportStatus = isLifeSupportOnline ? 'online' : 'offline';
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
console.log('System control software loaded.')
console.log('Running system diagnostics...\n')

console.log(seperatorLine);
console.log('  Main system check');
console.log(seperatorLine);
// Introduction session
console.log(`  Main computer systems...................... online`);
// First session
console.log(`  Bridge control systems..................... ${bridgeSystemStatus}`)
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
	console.log('  Tracing bridge control systems');
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
	console.log('  Tracing main reactor components');
	console.log(seperatorLine);
	console.log(`  Total Power Output Calculations............ ${arePowerCalculationsCorrect ? 'correct' : 'incorrect'}`);
	if (!arePowerCalculationsCorrect) {
		handleEvaluationOutput(powerCalculationEvaluations);
	}	
	console.log(`  Power Output Tolerance Calculations........ ${arePowerToleranceCalculationsCorrect ? 'correct' : 'incorrect'}`);
	if (arePowerCalculationsCorrect && !arePowerToleranceCalculationsCorrect) {
		handleEvaluationOutput(powerOutputToleranceEvaluations);
	}
	console.log(`  Emergency Shutdown Procedures.............. ${areEmergencyShutdownEvaluationsCorrect ? 'correct' : 'incorrect'}`);
	if (arePowerCalculationsCorrect &&
			arePowerToleranceCalculationsCorrect &&
			!areEmergencyShutdownEvaluationsCorrect) {
		handleEvaluationOutput(emergencyShutdownEvaluations);
	}
	console.log(`  Power Adjustment Procedures................ ${arePowerAdjustmentEvaluationsCorrect ? 'correct' : 'incorrect'}`);
	if (arePowerCalculationsCorrect &&
			arePowerToleranceCalculationsCorrect &&
			areEmergencyShutdownEvaluationsCorrect &&
			!arePowerAdjustmentEvaluationsCorrect) {
		handleEvaluationOutput(powerAdjustmentEvaluations);
	}
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
