const calculatePowerRequirements = (lighting, heating, airflow) => {
	return lighting + heating + airflow;
};

const keepSubSystemOnline = (isCriticalSystem, hasHighEnergyDraw) => {
	return isCriticalSystem ? true : !hasHighEnergyDraw;
};

const getTemperatureWithUnit = (temperatureInKelvin) => {
	return `${temperatureInKelvin - 273.15}°C`;
};

module.exports = {
	keepSubSystemOnline,
	getTemperatureWithUnit,
	calculatePowerRequirements
}