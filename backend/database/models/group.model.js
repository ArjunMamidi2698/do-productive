var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var Group = mongoose.model("groups", {
	groupId: String,
	groupName: String,
	creator: ObjectId, // objectid for the of user who created the group
});

module.exports.Group = Group;
