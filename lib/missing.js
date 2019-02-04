const colors = require('colors');

const { community_speakers } = require('../lib/community_values.js');
const { speakers } = require('../lib/values.js');

module.exports.showAllMissing = function () {
	console.log("Main Speakers: " + colors.green(speakers.length));
	console.log("Community Speakers: " + colors.blue(community_speakers.length));
	console.log("");
	console.log("Total: " + colors.red(speakers.length + community_speakers.length));
}