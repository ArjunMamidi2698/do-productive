var mongoose = require("mongoose");

var Task = mongoose.model("tasks", {
	taskId: String,
	taskTitle: String,
	priorityLevel: Number,
	doneTask: Boolean,
	groupId: String,
	creator: String, // Email id of user who created the task
});

module.exports.Task = Task;
