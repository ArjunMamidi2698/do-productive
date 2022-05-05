var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
var Task = require("../database/models/task.model").Task;

const requireLogin = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "you must be logged in" });
	}
	try {
		const { userId } = jwt.verify(authorization, JWT_SECRET);
		req.user = userId;
		next();
	} catch (err) {
		return res.status(401).json({ error: "you must be logged in" });
	}
};

const handleServerError = (res, error) => {
	return res.status(500).json({ error });
};
router.get("/getTasks", requireLogin, async (req, res) => {
	try {
		const data = await Task.find({
			creator: req.user,
		});
		const filteredTasks = data.map((obj) => {
			const { taskId, taskTitle, priorityLevel, doneTask, groupId } = obj;
			return { taskId, taskTitle, priorityLevel, doneTask, groupId };
		});
		res.status(200).json({ tasks: filteredTasks });
	} catch (error) {
		handleServerError(res, error);
	}
});

router.post("/addTask", requireLogin, async (req, res) => {
	try {
		const data = await new Task({
			taskId: req.body.taskId,
			taskTitle: req.body.taskTitle,
			priorityLevel: req.body.priorityLevel,
			doneTask: req.body.doneTask,
			groupId: req.body.groupId,
			creator: req.user,
		}).save();
		const { taskId, taskTitle, priorityLevel, doneTask, groupId } = data;
		res.status(200).json({
			message: "task created",
			task: { taskId, taskTitle, priorityLevel, doneTask, groupId },
		});
	} catch (error) {
		handleServerError(res, error);
	}
});

router.put("/updateTask", requireLogin, async (req, res) => {
	try {
		const data = await Task.findOneAndUpdate(
			{ taskId: req.body.taskId, creator: req.user },
			req.body,
			{ new: true }
		);
		const { taskId, taskTitle, priorityLevel, doneTask, groupId } = data;
		res.status(200).json({
			message: "task updated",
			task: { taskId, taskTitle, priorityLevel, doneTask, groupId },
		});
	} catch (error) {
		handleServerError(res, error);
	}
});

router.post("/deleteTask", requireLogin, async (req, res) => {
	try {
		const data = await Task.findOneAndDelete({
			taskId: req.body.taskId,
			creator: req.user,
		});
		const { taskId, taskTitle, priorityLevel, doneTask, groupId } = data;
		res.status(200).json({
			message: "task deleted",
			task: { taskId, taskTitle, priorityLevel, doneTask, groupId },
		});
	} catch (error) {
		handleServerError(res, error);
	}
});

module.exports = router;
module.exports.requireLogin = requireLogin;
module.exports.handleServerError = handleServerError;
