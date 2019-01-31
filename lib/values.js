
exports.speakers = [
	{
		name: 'Gulfnet', 
		asn: 3225,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS3225_1/routes",
		ixkwrs2: null, //TODO Need to fix by CITRA Team
	},
	{
		name: 'KEMS', 
		asn: 6412,
		dualPeering: true,
		multiAS: true,
		ixkwrs1_0: 'http://lg.ix.kw/alice/routeservers/0/protocols/AS6412_1/routes',
		ixkwrs2_0: 'http://lg.ix.kw/alice/routeservers/1/protocols/AS6412_1/routes',
		ixkwrs1_1: 'http://lg.ix.kw/alice/routeservers/0/protocols/AS6412_3/routes',
		ixkwrs2_1: 'http://lg.ix.kw/alice/routeservers/1/protocols/AS6412_3/routes',
	},
	{
		name: 'Zajil Kuwait', 
		asn: 42781,
		dualPeering: true,
		multiAS: true,
		ixkwrs1_0: null, //TODO Peering needs to add by CITRA team
		ixkwrs2_0: null,
		ixkwrs1_1: null,
		ixkwrs2_1: null,
	},
	{
		name: 'Qualitynet', 
		asn: 9155,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS9155_1/routes",
		ixkwrs2: "http://lg.ix.kw/alice/routeservers/1/protocols/AS9155_1/routes",
	},
	{
		name: 'Fasttelco', 
		asn: 21050,
		dualPeering: false,
		multiAS: true,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS21050_1/routes",
		ixkwrs2: "http://lg.ix.kw/alice/routeservers/1/protocols/AS21050_1/routes",
	},
	{
		name: 'Kuwait Data Center', 
		asn: 43852,
		dualPeering: false,
		multiAS: true,
		ixkwrs1: null, //TODO Peering needs to add by CITRA team
		ixkwrs2: null,
	},
	{
		name: 'Zain Kuwait', 
		asn: 42961,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: "http://lg.ix.kw/alice/routeservers/0/protocols/AS42961_3/routes", 
		ixkwrs2: "http://lg.ix.kw/alice/routeservers/1/protocols/AS42961_3/routes",
	},
	{
		name: 'Ooredoo Kuwait', 
		asn: 29357,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: null, //TODO Peering needs to add by CITRA team
		ixkwrs2: null,
	},
	{
		name: 'Viva Kuwait', 
		asn: 47589,
		dualPeering: false,
		multiAS: false,
		ixkwrs1: null, //TODO Peering needs to add by CITRA team
		ixkwrs2: null,
	},
];