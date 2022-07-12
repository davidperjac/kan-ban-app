const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.validate = (req, res, next) => {
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errors: errores.array() });
	}
	next();
};

exports.isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);
