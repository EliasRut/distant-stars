const {
	getPowerDraw,
	getMainReactorOutput,
	getBackupReactorOutput,
	adjustMainReactorOutput,
	adjustBackupReactorOutput,
	shutDownReactor
} = require("./coreSystems/reactorControl");

const getTotalPowerOutput = () => {
};

const isPowerOutputInTolerance = () => {
};

const performEmergencyShutdownIfNecessary = () => {
};

const adjustReactorSystems = () => {
};

const runAdvancedSimulations = false;

module.exports = {
	getTotalPowerOutput,
	isPowerOutputInTolerance,
	performEmergencyShutdownIfNecessary,
	adjustReactorSystems,
	runAdvancedSimulations
}