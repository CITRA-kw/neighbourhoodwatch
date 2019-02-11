const colors = require('colors');
const unique = require('array-unique');

const { community_speakers } = require('../lib/community_values.js');
const { speakers } = require('../lib/values.js');
const { scrapeURLs } = require('../lib/hack.js')
const bgpview = require('./bgpview.js');
const ixkw = require('./ixkw.js');

function ixkwDiff(bgpview_prefixes, ixkw_prefixes) {
	let diff = [];
	for (var i = 0; i < bgpview_prefixes.length; i++) {
		for (var j = 0; j < ixkw_prefixes.length; j++) {
			if (bgpview_prefixes[i] === ixkw_prefixes[j]) {
				delete bgpview_prefixes[i];
			}
		}
	}
	diff = bgpview_prefixes.filter(function (el) {return el != null;});
	return diff;
}

module.exports.showAllMissing = function () {
	let bgpviewRoutes = [];
	let ixkwRoutes = [];

	speakers.forEach(function(speaker) {
	    bgpviewRoutes.push(
	        bgpview.getPrefixes(speaker.asn)
	            .then((data) => {
	                return data;
	            }).catch ((error) => {
	                console.log('Error: ', error);
	            })
	    );
	});

	community_speakers.forEach(function(speaker) {
	    bgpviewRoutes.push(
	        bgpview.getPrefixes(speaker.asn)
	            .then((data) => {
	                return data;
	            }).catch ((error) => {
	                console.log('Error: ', error);
	            })
	    );
	});

	scrapeURLs.forEach(function(scrapeTarget) {
	    ixkwRoutes.push(
	        ixkw.scrapePrefixes(scrapeTarget.url)
	            .then((data) => {
	                return data;
	            }).catch ((error) => {
	                console.log('Error: ', error);
	            })
	    );
	});

	let ix = [];
	let internet = [];

	Promise.all(ixkwRoutes).then((results) => {
    	let ixkwPrefixes = unique(results.flat());
    	ix = ix.concat(ixkwPrefixes);
		Promise.all(bgpviewRoutes).then((data) => {
			let bgpviewPrefixes = data.flat();
			internet = internet.concat(bgpviewPrefixes);
			let df  = ixkwDiff(internet,ix);
			console.table(df);
			let objDiff = df.length;
			console.log(colors.bold("Total Routes of in ixkw: ") + colors.green(ix.length));
			console.log(colors.bold("Total Routes of Kuwait: ") + colors.green(internet.length));
			console.log(colors.red.bold("Missing Prefixes from ixkw: " + objDiff));
		});	
	});
}