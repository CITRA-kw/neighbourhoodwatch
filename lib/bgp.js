//BGP Compare 
const unique = require('array-unique');
const colors = require('colors');
const ora = require('ora'); // Spinner Promise TODO

const bgpview = require('./bgpview.js');
const ixkw = require('./ixkw.js');

function prefixDiff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
	return diff;
}

module.exports.prefixCompare = function (asn,rs1url,rs2url) {
	Promise.all([bgpview.getPrefixes(asn), ixkw.scrapePrefixes(rs1url), ixkw.scrapePrefixes(rs2url)]).then(function(results) {
		let merge = unique(results[1].concat(results[2]));
		let df  = prefixDiff(merge,results[0]);
		console.table(df);
		let objDiff = merge.length - results[0].length;
		console.log("ixkw difference to Internet: " + colors.green(objDiff) + " / ixkw: " + colors.red(merge.length) + " / bgpview: " + colors.blue(results[0].length));
	});
}

module.exports.prefixDualPeerCompare = function (asn,rs1_0url,rs1_1url,rs2_0url,rs2_1url) {
	Promise.all([bgpview.getPrefixes(asn), ixkw.scrapePrefixes(rs1_0url), ixkw.scrapePrefixes(rs1_1url), ixkw.scrapePrefixes(rs2_0url), ixkw.scrapePrefixes(rs2_1url)]).then(function(results) {
		let merge = unique(results[1].concat(results[2],results[3],results[4]));
		let df  = prefixDiff(merge,results[0]);
		console.table(df);
		let objDiff = merge.length - results[0].length;
		console.log("ixkw difference to Internet: " + colors.green(objDiff) + " / ixkw: " + colors.red(merge.length) + " / bgpview: " + colors.blue(results[0].length));
	});
}

module.exports.prefixDualASCompare = function (asn1,asn2,rs1url,rs2url) {
	Promise.all([bgpview.getPrefixes(asn1), bgpview.getPrefixes(asn2), ixkw.scrapePrefixes(rs1url), ixkw.scrapePrefixes(rs2url)]).then(function(results) {
		let merge_bgpview = unique(results[0].concat(results[1]));
		let merge_ixkw = unique(results[2].concat(results[3]));
		let df  = prefixDiff(merge_ixkw,merge_bgpview);
		console.table(df);
		let objDiff = merge_ixkw.length - merge_bgpview.length;
		console.log("ixkw difference to Internet: " + colors.green(objDiff) + " / ixkw: " + colors.red(merge_ixkw.length) + " / bgpview: " + colors.blue(merge_bgpview.length));
	});
}

module.exports.prefixDualASPeerCompare = function (asn1,asn2,rs1_0url,rs1_1url,rs2_0url,rs2_1url) { 
	Promise.all([bgpview.getPrefixes(asn1), bgpview.getPrefixes(asn2), ixkw.scrapePrefixes(rs1_0url), ixkw.scrapePrefixes(rs1_1url), ixkw.scrapePrefixes(rs2_0url), ixkw.scrapePrefixes(rs2_1url)]).then(function(results) {
		let merge_bgpview = unique(results[0].concat(results[1]));
		let merge_ixkw = unique(results[2].concat(results[3], results[4], results[5]));
		let df  = prefixDiff(merge_ixkw,merge_bgpview);
		console.table(df);
		let objDiff = merge_ixkw.length - merge_bgpview.length;
		console.log("ixkw difference to Internet: " + colors.green(objDiff) + " / ixkw: " + colors.red(merge_ixkw.length) + " / bgpview: " + colors.blue(merge_bgpview.length));
	});
}