var express = require("express");
var router = express.Router();
const { requireLogin, handleServerError } = require("./task");
require("dotenv").config();
var Group = require("../database/models/group.model").Group;

router.get("/getGroups", requireLogin, async (req, res) => {
	try {
		const data = await Group.find({
			creator: req.user,
		});
		const filteredGroups = data.map((obj) => {
			const { groupId, groupName } = obj;
			return { groupId, groupName };
		});
		res.status(200).json({ groups: filteredGroups });
	} catch (error) {
		handleServerError(res, error);
	}
});

router.post("/addGroup", requireLogin, async (req, res) => {
	try {
		const data = await new Group({
			groupId: req.body.groupId,
			groupName: req.body.groupName,
			creator: req.user,
		}).save();
		const { groupId, groupName } = data;
		res.status(200).json({
			message: "Group Created Successfully",
			group: { groupId, groupName },
		});
	} catch (error) {
		handleServerError(res, error);
	}
});

router.put("/updateGroup", requireLogin, async (req, res) => {
	try {
		const data = await Group.findOneAndUpdate(
			{ groupId: req.body.groupId, creator: req.user },
			req.body,
			{ new: true }
		);
		const { groupId, groupName } = data;
		res.status(200).json({
			message: "Group Upadted Successfully",
			group: { groupId, groupName },
		});
	} catch (error) {
		handleServerError(res, error);
	}
});

router.post("/deleteGroup", requireLogin, async (req, res) => {
	try {
		const data = await Group.findOneAndDelete({
			groupId: req.body.groupId,
			creator: req.user,
		});
		const { groupId, groupName } = data;
		res.status(200).json({
			message: "Group Deleted Successfully",
			group: { groupId, groupName },
		});
	} catch (error) {
		handleServerError(res, error);
	}
});

module.exports = router;
