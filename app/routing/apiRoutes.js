//dependencies
var path = require("path");
var friendData = require("../data/friends");

module.exports = function(app) {

	//display JSON of all possible friends
	app.get("/api/friends", function(req,res) {
		res.json(friendData);
	});

	//handle incoming survey results & compatibility logic (post)
	app.post("/api/friends", function(req,res) {
		var rawFriend = req.body;
		var rawScore = rawFriend.scores
		var numScore = [];
		var matches = [];
		for(i=0; i<rawScore.length;i++) {
			numScore.push(parseInt(rawScore[i]));
		}

		console.log(numScore);

		totalDiff = 0;
		for(i=0; i<friendData.length; i++) {
			console.log(friendData[i].scores);
			console.log(numScore);
				for(n=0; n<friendData[i].scores.length; n++) {
						diff = Math.abs(friendData[i].scores[n] - numScore[n]);
					
					console.log(diff);
					totalDiff += diff

				}
			matches.push({
				name: friendData[i].name,
				photo: friendData[i].photo,
				totaldiff: totalDiff});
			console.log(totalDiff);
			totalDiff = 0
		}
		console.log(matches);
		matches.sort(function(a,b) {
			return a.totaldiff - b.totaldiff;
		});
		console.log("-----------------")
		console.log(matches[0]);
		match = JSON.stringify(matches[0]);
		res.json(match);

	});
}

