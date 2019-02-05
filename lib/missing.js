const colors = require('colors');

const { community_speakers } = require('../lib/community_values.js');
const { speakers } = require('../lib/values.js');
const bgpview = require('./bgpview.js');

function keepGetting(){

}

module.exports.showAllMissing = function () {
	let agg_bgpview_data = [];
	let agg_ixkw_data = [];
	speakers.forEach((speaker) => {
		let data = bgpview.getPrefixes(speaker.asn).then(function(result) {
			return result;
		});
		
	});
	console.log(agg_bgpview_data);
}