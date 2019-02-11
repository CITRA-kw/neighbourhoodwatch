//BGP Compare 
const unique = require('array-unique');
const colors = require('colors');
const ora = require('ora'); // Spinner Promise TODO

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

module.exports.prefixCompare = function (asn,rs1url,rs2url) {
	Promise.all([bgpview.getPrefixes(asn), ixkw.scrapePrefixes(rs1url), ixkw.scrapePrefixes(rs2url)]).then(function(results) {
		let merge = unique(results[1].concat(results[2]));
		let df = ixkwDiff(results[0],merge);
		console.table(df);
		let objDiff = df.length;
		console.log("Missing Prefixes from ixkw: " + colors.green(objDiff) + " --- ixkw: " + colors.red(merge.length) + " / Internet: " + colors.blue(results[0].length));
	});
}

module.exports.prefixDualPeerCompare = function (asn,rs1_0url,rs1_1url,rs2_0url,rs2_1url) {
	Promise.all([bgpview.getPrefixes(asn), ixkw.scrapePrefixes(rs1_0url), ixkw.scrapePrefixes(rs1_1url), ixkw.scrapePrefixes(rs2_0url), ixkw.scrapePrefixes(rs2_1url)]).then(function(results) {
		let merge = unique(results[1].concat(results[2],results[3],results[4]));
		let df = ixkwDiff(results[0],merge);
		console.table(df);
		let objDiff = df.length;
		console.log("Missing Prefixes from ixkw: " + colors.green(objDiff) + " --- ixkw: " + colors.red(merge.length) + " / Internet: " + colors.blue(results[0].length));
	});
}

module.exports.prefixDualASCompare = function (asn1,asn2,rs1url,rs2url) {
	Promise.all([bgpview.getPrefixes(asn1), bgpview.getPrefixes(asn2), ixkw.scrapePrefixes(rs1url), ixkw.scrapePrefixes(rs2url)]).then(function(results) {
		let merge_bgpview = unique(results[0].concat(results[1]));
		let merge_ixkw = unique(results[2].concat(results[3]));
		let df  = ixkwDiff(merge_bgpview,merge_ixkw);
		console.table(df);
		let objDiff = df.length;
		console.log("Missing Prefixes from ixkw: " + colors.green(objDiff) + " --- ixkw: " + colors.red(merge_ixkw.length) + " / Internet: " + colors.blue(merge_bgpview.length));
	});
}

module.exports.prefixDualASPeerCompare = function (asn1,asn2,rs1_0url,rs1_1url,rs2_0url,rs2_1url) { 
	Promise.all([bgpview.getPrefixes(asn1), bgpview.getPrefixes(asn2), ixkw.scrapePrefixes(rs1_0url), ixkw.scrapePrefixes(rs1_1url), ixkw.scrapePrefixes(rs2_0url), ixkw.scrapePrefixes(rs2_1url)]).then(function(results) {
		let merge_bgpview = unique(results[0].concat(results[1]));
		let merge_ixkw = unique(results[2].concat(results[3], results[4], results[5]));
		let df  = ixkwDiff(merge_bgpview,merge_ixkw);
		console.table(df);
		let objDiff = df.length;
		console.log("Missing Prefixes from ixkw: " + colors.green(objDiff) + " --- ixkw: " + colors.red(merge_ixkw.length) + " / Internet: " + colors.blue(merge_bgpview.length));
	});
}