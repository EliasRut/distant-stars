let _isReactorRunning = true;

let _mainReactorOutput = 0;
let _backupReactorOutput = 0;
let _powerDraw = 0;
let _adjustMainReactorCalls = 0;
let _adjustBackupReactorCalls = 0;

const resetCounts = () => {
	_adjustMainReactorCalls = 0;
	_adjustBackupReactorCalls = 0;
}

const restartReactor = () => {
	_isReactorRunning = true;
}

const shutDownReactor = () => {
	_isReactorRunning = false;
	_mainReactorOutput = 0;
}

const getIsReactorRunning = () => {
	return _isReactorRunning;
}

const getMainReactorOutput = () => {
	return _mainReactorOutput;
}

const getBackupReactorOutput = () => {
	return _backupReactorOutput;
}

const getPowerDraw = () => {
	return _powerDraw
}

const setMainReactorOutput = (newValue) => {
	_mainReactorOutput = newValue;
}

const setBackupReactorOutput = (newValue) => {
	_backupReactorOutput = newValue;
}

const setPowerDraw = (newValue) => {
	_powerDraw = newValue;
}

const adjustMainReactorOutput = (newValue) => {
	if (_adjustMainReactorCalls > 0) {
		throw new Error('Second call to adjustMainReactorOutput. ' + 
			'Only one adjustment per situation change is possible.')
	}
	if (newValue < 0) {
		throw new Error('Can not set main reactor output below 0.');
	}
	if (newValue > 50) {
		throw new Error('Can not set main reactor output above 50.');
	}
	const diff = Math.abs(newValue - _mainReactorOutput);
	if (diff > 10) {
		throw new Error('Can not savely change reactor output by more than 10 in one step.');
	}
	_mainReactorOutput = newValue;
}

const adjustBackupReactorOutput = (newValue) => {
	if (_adjustBackupReactorCalls > 0) {
		throw new Error('Second call to adjustBackupReactorOutput. ' + 
			'Only one adjustment per situation change is possible.')
	}
	if (newValue < 0) {
		throw new Error('Can not set test reactor output below 0.');
	}
	if (newValue > 50) {
		throw new Error('Can not set test reactor output above 10.');
	}
	_backupReactorOutput = newValue;
}

module.exports = {
	restartReactor,
	shutDownReactor,
	getIsReactorRunning,
	getMainReactorOutput,
	getBackupReactorOutput,
	getPowerDraw,
	setMainReactorOutput,
	setBackupReactorOutput,
	setPowerDraw,
	resetCounts,
	adjustMainReactorOutput,
	adjustBackupReactorOutput
}