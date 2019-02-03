//BGPVIEW.io API Interaction
const request = require('request-promise');
const _ = require("underscore");

function getRequest(asn) {
	return request({
		"method":"GET", 
  		"uri": "https://api.bgpview.io/asn/"+asn+"/prefixes",
  		"json": true,
  		"headers": {
    		"User-Agent": "neighbourwatch"
  		}
	});
}
module.exports.getPrefixes = function(asn) {
	let data = getRequest(asn).then(function(result) {
			let routes =  _.pluck(result.data.ipv4_prefixes, 'prefix');
			return routes;
	});
	return data;
}
