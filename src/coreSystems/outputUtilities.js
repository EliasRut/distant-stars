
const handleEvaluationOutput = (evaluationList) => {
	evaluationList.forEach((evaluation) => {
		console.log(`    ${evaluation[0]}`.padEnd(45, '.') + ` ${evaluation[1] ? 'correct' : 'incorrect'}`);
		if (!evaluation[1]) {
			console.log(evaluation[2]);
		}
	});
}

module.exports = {
	handleEvaluationOutput
}
