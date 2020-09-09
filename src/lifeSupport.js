const calculatePowerRequirements = (lighting, heating, airflow) => {
	return lighting + heating + airflow;
};

const keepSubSystemOnline = (isCriticalSystem, hasHighEnergyRequirements) => {
	return isCriticalSystem || !hasHighEnergyRequirements;
};

const getTemperatureWithUnit = (temperatureinKelvin) => {
	return `${temperatureinKelvin - 273.15}°C`;
};

module.exports = {
	keepSubSystemOnline,
	getTemperatureWithUnit,
	calculatePowerRequirements
}