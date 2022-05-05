var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var Task = mongoose.model("tasks", {
	taskId: String,
	taskTitle: String,
	priorityLevel: Number,
	doneTask: Boolean,
	groupId: String,
	creator: ObjectId, // objectid for the of user who created the task
});

module.exports.Task = Task;
