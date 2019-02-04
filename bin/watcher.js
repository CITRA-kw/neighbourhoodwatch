#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');

const list_speakers = require('../lib/list_speakers.js');
const $ = require('../lib/bgp.js');
const { speakers } = require('../lib/values.js');

//List_Speaker
program
  .command('speakers') // sub-command name
  .alias('s') // alternative sub-command is `al`
  .description('List all Kuwait BGP Speakers') // command description
  .action(function () {
        list_speakers();
   });

//List spef. speaker Difference to IX
program
  .command('list') // sub-command name
  .alias('ls') // alternative sub-command is `al`
  .description('List difference of [speaker] to ixkw') // command description
  .action(function () {
        let alias = process.argv[3];
		speakers.forEach((speaker) => {
			if (speaker.alias == alias && speaker.dualPeering == false && speaker.multiAS == false) {
				$.prefixCompare(speaker.asn,speaker.ixkwrs1,speaker.ixkwrs2);
			} else if (speaker.alias == alias && speaker.dualPeering == true && speaker.multiAS == false) {
				$.prefixDualPeerCompare(speaker.asn,speaker.ixkwrs1_0,speaker.ixkwrs1_1,speaker.ixkwrs2_0,speaker.ixkwrs2_1);
			} else if (speaker.alias == alias && speaker.dualPeering == false && speaker.multiAS == true) { 
				$.prefixDualASCompare(speaker.asn,43852,speaker.ixkwrs1,speaker.ixkwrs2);
			} else if (speaker.alias == alias && speaker.dualPeering == true && speaker.multiAS == true) {
				$.prefixDualASPeerCompare(speaker.asn,42781,speaker.ixkwrs1_0,speaker.ixkwrs1_1,speaker.ixkwrs2_0,speaker.ixkwrs2_1);
			}
 		});
	});

//List all speaker Difference to IX
program
  .command('all') // sub-command name
  .alias('a') // alternative sub-command is `al`
  .description('List difference of all speakers in ixkw') // command description
  .action(function () {
        console.log("all Under development!");
   });

program
  .command('missing') // sub-command name
  .alias('m') // alternative sub-command is `al`
  .description('List all missing prefixes in Kuwait') // command description
  .action(function () {
        console.log("missing Under development!");
   });

//process arg from bash
program.parse(process.argv);




