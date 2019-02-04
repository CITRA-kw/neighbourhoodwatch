//IXKW looking glass scraping
const puppeteer = require('puppeteer');
const $ = require('cheerio'); //Maybe remove // Double Check

module.exports.scrapePrefixes = async function(targetURL) {	
	const browser = await puppeteer.launch();
  	const page = await browser.newPage();
  	await page.goto(targetURL);
  	let routenetworks = await page.evaluate(() => {
  		let data = [];
  		let routes = document.querySelectorAll('.route-network');
  		for (var route of routes)
  			data.push(route.textContent);
  		return data;
  	});
  	await browser.close();
  	return routenetworks;
}
