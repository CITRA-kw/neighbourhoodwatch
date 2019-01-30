//neighbourWatch Tool
const request = require('request-promise');
const _ = require("underscore");
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const unique = require('array-unique');

const bgp = {
	gulfnet: {
		name: 'Gulfnet', 
		asn: 3225,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS3225_1/routes",
		ixkwrs2: null, //TODO Need to fix by CITRA Team
	},
	kems: {
		name: 'KEMS', 
		asn: 6412,
		dualPeering: true,
		multiAS: true,
		ixkwrs1_0: 'http://lg.ix.kw/alice/routeservers/0/protocols/AS6412_1/routes',
		ixkwrs2_0: 'http://lg.ix.kw/alice/routeservers/1/protocols/AS6412_1/routes',
		ixkwrs1_1: 'http://lg.ix.kw/alice/routeservers/0/protocols/AS6412_3/routes',
		ixkwrs2_1: 'http://lg.ix.kw/alice/routeservers/1/protocols/AS6412_3/routes',
	},
	zajilkw: {
		name: 'Zajil Kuwait', 
		asn: 42781,
		dualPeering: true,
		multiAS: true,
		ixkwrs1_0: null, //TODO Peering needs to add by CITRA team
		ixkwrs2_0: null,
		ixkwrs1_1: null,
		ixkwrs2_1: null,
	},
	qnet: {
		name: 'Qualitynet', 
		asn: 9155,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS9155_1/routes",
		ixkwrs2: "http://lg.ix.kw/alice/routeservers/1/protocols/AS9155_1/routes",
	},
	fast: {
		name: 'Fasttelco', 
		asn: 21050,
		dualPeering: false,
		multiAS: true,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS21050_1/routes",
		ixkwrs2: "http://lg.ix.kw/alice/routeservers/1/protocols/AS21050_1/routes",
	},
	kwdata: {
		name: 'Kuwait Data Center', 
		asn: 43852,
		dualPeering: false,
		multiAS: true,
		ixkwrs1: null, //TODO Peering needs to add by CITRA team
		ixkwrs2: null,
	},
	zainkw: {
		name: 'Zain Kuwait', 
		asn: 42961,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS42961_3/routes", 
		ixkwrs2: "http://lg.ix.kw/alice/routeservers/1/protocols/AS42961_3/routes",
	},
	ooredookw: {
		name: 'Ooredoo Kuwait', 
		asn: 29357,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: null, //TODO Peering needs to add by CITRA team
		ixkwrs2: null,
	},
	vivakw: {
		name: 'Viva Kuwait', 
		asn: 47589,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: null, //TODO Peering needs to add by CITRA team
		ixkwrs2: null,
	},
	prefixCompare: function () {
		Promise.all([bgpview.getPrefixes(bgp.gulfnet.asn), ixkw.scrapePrefixes(bgp.gulfnet.ixkwrs1)]).then(function(results) {
			let df  = bgp.prefixDiff(results[1],results[0]);
			console.table(df);
			let objDiff = results[1].length - results[0].length;
			console.log("ixkw difference to Internet: " + objDiff + " / ixkw: " + results[1].length + " / bgpview: " + results[0].length);
		});
	},
	prefixDualPeerCompare: function () {
		Promise.all([bgpview.getPrefixes(bgp.kems.asn), ixkw.scrapePrefixes(bgp.kems.ixkwrs1_0), ixkw.scrapePrefixes(bgp.kems.ixkwrs1_1), ixkw.scrapePrefixes(bgp.kems.ixkwrs2_0), ixkw.scrapePrefixes(bgp.kems.ixkwrs2_1)]).then(function(results) {
			let merge = unique(results[1].concat(results[2],results[3],results[4]));
			let df  = bgp.prefixDiff(merge,results[0]);
			console.table(df);
			let objDiff = merge.length - results[0].length;
			console.log("ixkw difference to Internet: " + objDiff + " / ixkw: " + results[1].length + " / bgpview: " + results[0].length);
		});
	},
	prefixDualASCompare: function () {
		Promise.all([bgpview.getPrefixes(bgp.fast.asn), bgpview.getPrefixes(bgp.kwdata.asn), ixkw.scrapePrefixes(bgp.fast.ixkwrs1), ixkw.scrapePrefixes(bgp.fast.ixkwrs2), ixkw.scrapePrefixes(bgp.kwdata.ixkwrs1, ixkw.scrapePrefixes(bgp.kwdata.ixkwrs2))]).then(function(results) {
			let merge_bgpview = unique(results[0].concat(results[1]));
			let merge_ixkw = unique(results[2].concat(results[3], results[4], results[5]));
			let df  = bgp.prefixDiff(merge_ixkw,merge_bgpview);
			console.table(df);
			let objDiff = results[1].length - results[0].length;
			console.log("ixkw difference to Internet: " + objDiff + " / ixkw: " + merge_ixkw.length + " / bgpview: " + merge_bgpview.length);
		});
	},
	prefixDiff: function (a1, a2) {
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
}
//BGPVIEW.io API Interaction
const bgpview = {
	getRequest: function(asn) {
		return request({
			"method":"GET", 
      		"uri": "https://api.bgpview.io/asn/"+asn+"/prefixes",
      		"json": true,
      		"headers": {
        		"User-Agent": "neighbourwatch"
      		}
		});
	},
	getPrefixes: function(asn) {
		let data = bgpview.getRequest(asn).then(function(result) {
  			let routes =  _.pluck(result.data.ipv4_prefixes, 'prefix');
  			return routes;
		});
		return data;
	}
}
//IXKW looking glass scraping Interaction
const ixkw = {
		scrapePrefixes:  async function(targetURL) {	
			  	const browser = await puppeteer.launch();
		  	const page = await browser.newPage();
		  	await page.goto(targetURL);
		  	let routenetworks = await page.evaluate(() => {
		  		let data = [];
		  		let routes = document.getElementsByClassName('route-network');
		  		for (var route of routes)
		  			data.push(route.textContent);
		  		return data;
		  	});
		  	await browser.close();
		  	return routenetworks;
		}
}
//HE BGP Scaping Interaction
const he = {
	scrapePrefixes: async function(targetURL) {
  		const browser = await puppeteer.launch();
	  	const page = await browser.newPage();
	  	await page.goto(targetURL);
	  	let routenetworks = await page.evaluate(() => {
	  		let data = [];
	  		let routes = document.getElementsByClassName('route-network');
	  		for (var route of routes)
	  			data.push(route.textContent);
	  		return data;
	  	});
	  	await browser.close();
	  	return routenetworks;
	}
}

//------------------------------- function_code -------------------------------//
bgp.prefixDualASCompare();



