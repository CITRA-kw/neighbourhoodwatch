#!/usr/bin/env node

const request = require('request-promise');
const _ = require("underscore");
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const unique = require('array-unique');
const program = require('commander');
const colors = require('colors');

const list_speakers = require('../lib/list_speakers');

const bgp = {
	prefixCompare: function () {
		Promise.all([bgpview.getPrefixes(bgp.gulfnet.asn), ixkw.scrapePrefixes(bgp.qnet.ixkwrs1), ixkw.scrapePrefixes(bgp.qnet.ixkwrs2)]).then(function(results) {
			let merge = unique(results[1].concat(results[2]));
			let df  = bgp.prefixDiff(merge,results[0]);
			console.table(df);
			let objDiff = merge.length - results[0].length;
			console.log("ixkw difference to Internet: " + objDiff + " / ixkw: " + merge.length + " / bgpview: " + results[0].length);
		});
	},
	prefixDualPeerCompare: function () {
		Promise.all([bgpview.getPrefixes(bgp.kems.asn), ixkw.scrapePrefixes(bgp.kems.ixkwrs1_0), ixkw.scrapePrefixes(bgp.kems.ixkwrs1_1), ixkw.scrapePrefixes(bgp.kems.ixkwrs2_0), ixkw.scrapePrefixes(bgp.kems.ixkwrs2_1)]).then(function(results) {
			let merge = unique(results[1].concat(results[2],results[3],results[4]));
			let df  = bgp.prefixDiff(merge,results[0]);
			console.table(df);
			let objDiff = merge.length - results[0].length;
			console.log("ixkw difference to Internet: " + objDiff + " / ixkw: " + merge.length + " / bgpview: " + results[0].length);
		});
	},
	prefixDualASCompare: function () { //TODO No kwdata rs defined
		Promise.all([bgpview.getPrefixes(bgp.fast.asn), bgpview.getPrefixes(bgp.kwdata.asn), ixkw.scrapePrefixes(bgp.fast.ixkwrs1), ixkw.scrapePrefixes(bgp.fast.ixkwrs2)]).then(function(results) {
			let merge_bgpview = unique(results[0].concat(results[1]));
			let merge_ixkw = unique(results[2].concat(results[3]));
			let df  = bgp.prefixDiff(merge_ixkw,merge_bgpview);
			console.table(df);
			let objDiff = merge_ixkw.length - merge_bgpview.length;
			console.log("ixkw difference to Internet: " + objDiff + " / ixkw: " + merge_ixkw.length + " / bgpview: " + merge_bgpview.length);
		});
	},
	prefixDualASPeerCompare: function () { //TODO No Zajil rs defined
		Promise.all([bgpview.getPrefixes(bgp.kems.asn), bgpview.getPrefixes(bgp.zajilkw.asn), ixkw.scrapePrefixes(bgp.kems.ixkwrs1_0), ixkw.scrapePrefixes(bgp.kems.ixkwrs1_1), ixkw.scrapePrefixes(bgp.kems.ixkwrs2_0), ixkw.scrapePrefixes(bgp.kems.ixkwrs2_1)]).then(function(results) {
			let merge_bgpview = unique(results[0].concat(results[1]));
			let merge_ixkw = unique(results[2].concat(results[3], results[4], results[5]));
			let df  = bgp.prefixDiff(merge_ixkw,merge_bgpview);
			console.table(df);
			let objDiff = merge_ixkw.length - merge_bgpview.length;
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
//------------------------------- commander_program_fucntional_code -------------------------------//
/**
program
  .version('0.1.0')
  .option('-s, --speakers', 'List all Kuwait BGP Speakers')
  .option('-l, --list', 'List difference of [speaker]')
  .option('-a, --all', 'List difference of all speakers')
  .option('-h, --help', 'Show Help Menu')
**/
program
  .command('speakers') // sub-command name
  .alias('s') // alternative sub-command is `al`
  .description('List all Kuwait BGP Speakers') // command description
  .action(function () {
        list_speakers();
    });

program.parse(process.argv);




