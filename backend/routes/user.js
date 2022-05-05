var express = require("express");
var router = express.Router();
var dbService = require("../database/db-crud.service"); // CRUD operations
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
var User = require("../database/models/user.model").User;
var Task = require("../database/models/task.model").Task;
var Group = require("../database/models/group.model").Group;
var UserIdList = require("../database/models/user.model").UserIdList;

router.post("/signup", async (req, res) => {
	const { email, password, username } = req.body;
	try {
		if (!email || !password) {
			return res
				.status(422)
				.json({ error: "please add all the required fields" });
		}
		const user = await User.findOne({ email });
		if (user) {
			return res
				.status(422)
				.json({ error: "user already exists with that email" });
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		await new User({
			email,
			password: hashedPassword,
			username,
		}).save();
		res.status(200).json({ message: "signup success you can login now" });
	} catch (err) {
		console.log(err);
	}
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res
				.status(422)
				.json({ error: "please add all the required fields" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(404)
				.json({ error: "user doesnt exist with that email" });
		}
		const doMatch = await bcrypt.compare(password, user.password);
		if (doMatch) {
			const token = jwt.sign({ userId: user._id }, JWT_SECRET);
			res.status(200).json({ token });
		} else {
			return res
				.status(401)
				.json({ error: "email or password is invalid" });
		}
	} catch (err) {
		console.log(err);
	}
});

// // verify guest existence
// router.post("/guestUser", async (req, res) => {
// 	// verify guest details
// 	let userData = [];
// 	await dbService
// 		.findInDatabase(User, { userId: req.body.userId }, res)
// 		.then((data) => {
// 			userData = data;
// 		});
// 	if (userData && userData.length > 0) {
// 		res.status(200).send({ message: "User Existed" });
// 	} else {
// 		var user = new User();
// 		user.userId = req.body.userId;
// 		user.loggedIn = true;
// 		await dbService.addToDatabase(user, res).then((data) => {
// 			console.log("saved user data successfully");
// 		});
// 		res.status(200).send({ message: "User Created Successfully" });
// 	}
// });

// // verify user
// router.post("/loginUser", async (req, res) => {
// 	// verify user details
// 	let userData = [];
// 	await dbService
// 		.findInDatabase(
// 			User,
// 			{ username: req.body.username, password: req.body.password },
// 			res
// 		)
// 		.then((data) => {
// 			userData = data;
// 		});
// 	if (userData && userData.length > 0) {
// 		await dbService
// 			.updateInDatabase(
// 				User,
// 				{ userId: userData[0].userId },
// 				{
// 					$set: {
// 						loggedIn: true,
// 					},
// 				},
// 				res
// 			)
// 			.then((data) => {
// 				console.log(
// 					data,
// 					"Updated User data Successfully => user logged in"
// 				);
// 			});
// 		res.status(200).send({ userId: userData[0].userId });
// 	} else {
// 		res.status(201).send({ message: "User Not Found" });
// 	}
// });

// // Add User
// router.post("/registerUser", async (req, res) => {
// 	const userObj = req.body;
// 	// check for availability
// 	let userData = [];
// 	await dbService
// 		.findInDatabase(User, { username: req.body.username }, res)
// 		.then((data) => {
// 			userData = data;
// 		});
// 	if (userData && userData.length > 0) {
// 		res.status(201).send({ message: "UserName Taken" });
// 	} else {
// 		// add user to database
// 		var user = new User();
// 		user.username = userObj.username;
// 		user.password = userObj.password;

// 		// get all userId
// 		let userTokensData = [];
// 		await dbService.findInDatabase(UserIdList, {}, res).then((data) => {
// 			userTokensData = data;
// 		});

// 		// get new userId
// 		let randomId = Math.random().toString(36).slice(2);
// 		while (userTokensData.indexOf(randomId) > -1) {
// 			randomId = Math.random().toString(36).slice(2);
// 		}

// 		user.userId = randomId;
// 		user.loggedIn = true;
// 		await dbService.addToDatabase(user, res).then((data) => {
// 			console.log(data, "saved user data successfully");
// 		});

// 		var UserIdList = new UserIdList();
// 		await dbService.addToDatabase(user, res).then((data) => {
// 			console.log(data, "saved user data successfully");
// 		});

// 		res.status(200).send({
// 			userId: randomId,
// 			message: "User Registered Successfully",
// 		});
// 	}
// });

// // logout
// router.post("/logoutUser", async (req, res) => {
// 	// verify user details
// 	let userData = [];
// 	await dbService
// 		.findInDatabase(User, { userId: req.body.userId }, res)
// 		.then((data) => {
// 			userData = data;
// 		});
// 	if (userData && userData.length > 0) {
// 		await dbService
// 			.updateInDatabase(
// 				User,
// 				{ userId: req.body.userId },
// 				{
// 					$set: {
// 						loggedIn: false,
// 					},
// 				},
// 				res
// 			)
// 			.then((data) => {
// 				console.log("Updated User data Successfully => user logged in");
// 			});
// 		res.status(200).send({ userId: userData.userId });
// 	} else {
// 		res.status(201).send({ message: "User Not Found" });
// 	}
// });

module.exports = router;
