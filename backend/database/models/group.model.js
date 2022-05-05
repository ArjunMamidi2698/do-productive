var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var Group = mongoose.model("groups", {
	groupId: {
		type: String,
		required: true,
	},
	groupName: {
		type: String,
		default: "",
	},
	creator: {
		type: ObjectId, // objectid for the of user who created the group
		required: true,
	},
});

module.exports.Group = Group;
