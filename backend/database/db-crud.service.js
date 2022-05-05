const buildErrorObj = (err) => {
	return {
		showSnackbar: true,
		snackbarMessage: err,
		snackbarType: "error",
	};
};

var findInDatabase = async function (model, query, res) {
	let result = "result";
	await model.find(query, (err, data) => {
		if (err) {
			const errObj = buildErrorObj(err);
			res.send(errObj);
			throw err;
		}
		result = data;
	});
	return result;
};

var addToDatabase = async function (modelInstance, res) {
	let result = "result";
	await modelInstance.save((err, data) => {
		if (err) {
			const errObj = buildErrorObj(err);
			res.send(errObj);
			throw err;
		}
		result = data;
	});
	return result;
};

var updateInDatabase = async function (model, query, options, res) {
	let result = "result";
	await model.updateOne(query, options, (err, data) => {
		if (err) {
			const errObj = buildErrorObj(err);
			res.send(errObj);
			throw err;
		}
		result = data;
	});
	return result;
};

var deleteFromDatabase = async function (model, query, res) {
	let result = "result";
	await model.deleteOne(query, (err, data) => {
		if (err) {
			const errObj = buildErrorObj(err);
			res.send(errObj);
			throw err;
		}
		result = data;
	});
	return result;
};

module.exports = {
	findInDatabase,
	addToDatabase,
	updateInDatabase,
	deleteFromDatabase,
};
