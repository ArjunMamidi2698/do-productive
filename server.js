var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var server = require("http").createServer(app);
var serveStatic = require("serve-static");

var userRoutes = require("./backend/routes/user");
var taskRoutes = require("./backend/routes/task");

var db = mongoose.connection;
var dbconnected = false;
//connection to Database using mongoose.connect(url)
var dbConfig = require("./backend/database/mongoConnectURI");
if (process.env.NODE_ENV == "production") {
	mongoose.connect(dbConfig.uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} else {
	// local mongodb
	mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASENAME}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

db.on("error", function () {
	dbconnected = false;
	console.log("Error connecting to Database");
});

db.on("open", function () {
	dbconnected = true;
	console.log("Database Connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.use("/", userRoutes);
// app.use('/', taskRoutes);

if (process.env.NODE_ENV == "production") {
	app.use(serveStatic(__dirname + "/client/build"));
	app.get(/.*/, (req, res) =>
		res.sendFile(__dirname + "/client/build/index.html")
	);
}
console.log(process.env.NODE_ENV);

const port = process.env.PORT || 8179;
server.listen(port, () => {
	console.log(`listening at ${port} port!!!!`);
});
