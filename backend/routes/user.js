var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
var User = require("../database/models/user.model").User;

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

module.exports = router;
