var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var Task = mongoose.model("tasks", {
	taskId: {
		type: String,
		required: true,
	},
	taskTitle: {
		type: String,
		default: "",
	},
	priorityLevel: {
		type: Number,
		default: 4,
	},
	doneTask: {
		type: Boolean,
		default: false,
	},
	groupId: {
		type: String,
		default: "",
	},
	creator: {
		type: ObjectId, // objectid for the of user who created the task
		required: true,
	},
});

module.exports.Task = Task;
