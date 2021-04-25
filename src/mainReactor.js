const {
	getPowerDraw,
	getMainReactorOutput,
	getBackupReactorOutput,
	adjustMainReactorOutput,
	adjustBackupReactorOutput,
	shutDownReactor
} = require("./coreSystems/reactorControl");

const getTotalPowerOutput = () => {
	const mainReactor = getMainReactorOutput();
	const backupReactor = getBackupReactorOutput();
	return mainReactor + backupReactor;
};

const isPowerOutputInTolerance = () => {
	const mainReactor = getMainReactorOutput();

	const powerDraw = getPowerDraw();
	return mainReactor <= powerDraw;
};

const performEmergencyShutdownIfNecessary = () => {
	if (!isPowerOutputInTolerance()) {
		shutDownReactor();
	}
};

const adjustReactorSystems = () => {
	const powerDraw = getPowerDraw();
	const currentMainOutput = getMainReactorOutput();
	
	const intendedMainPower = Math.max(0, powerDraw - 5);
	const mainPowerDiff = intendedMainPower - currentMainOutput;
	const potentialDiff = Math.min(10, Math.max(-10, mainPowerDiff));
	const newMainSetting = Math.min(50, currentMainOutput + potentialDiff);
	const intendedNewBackupOutput = powerDraw - newMainSetting;
	const newBackupSetting = Math.max(5, Math.min(10, intendedNewBackupOutput));

	adjustMainReactorOutput(newMainSetting);
	adjustBackupReactorOutput(newBackupSetting);
	performEmergencyShutdownIfNecessary();
};

const runAdvancedSimulations = true;

module.exports = {
	getTotalPowerOutput,
	isPowerOutputInTolerance,
	performEmergencyShutdownIfNecessary,
	adjustReactorSystems,
	runAdvancedSimulations
}