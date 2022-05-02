var mongoose = require("mongoose");

var Group = mongoose.model("groups", {
	groupId: String,
	groupName: String,
	creator: String, // Email id of user who created the group
});

module.exports.Group = Group;
