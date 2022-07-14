const Board = require('../models/board');
const Section = require('../models/section');
const Task = require('../models/task');

exports.create = async (req, res) => {
	try {
		const boardsCount = await Board.find().count();
		const board = await Board.create({
			user: req.user._id,
			position: boardsCount > 0 ? boardsCount : 0,
		});
		res.status(201).json(board);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.getAll = async (req, res) => {
	try {
		const boards = await Board.find({ user: req.user._id }).sort('-position');
		res.status(200).json(boards);
	} catch (err) {
		res.status(500).json(err);
	}
};
