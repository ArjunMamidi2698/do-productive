var mongoose = require("mongoose");

var User = mongoose.model("users", {
	email: String,
	password: String, // encrypted
	username: String,
});

module.exports.User = User;
