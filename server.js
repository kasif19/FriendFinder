//dependencies
var express = require("express");
var bodyParser = require("body-parser");

//create express server
var app = express();

//initial port (change this to heroku?)
var PORT = process.env.PORT || 8080;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//route files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//listener
app.listen(PORT, function() {
	console.log("Listening on PORT: " + PORT);
});