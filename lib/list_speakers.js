const colors = require('colors');

const { speakers } = require('./values.js');
const { community_speakers } = require('../lib/community_values.js');

module.exports = function() {
    console.log('');
    console.log(colors.blue.bold('Kuwait BGP Speakers'));
    console.log(colors.blue.bold('-------------------'));
	console.log('');
	console.log(colors.red.bold('ISPs/MNOs'));
    console.log(colors.red.bold('---------'));
    // list on separate lines
    speakers.forEach((speaker) => {
        console.log('%s %s', colors.bold(speaker.name), colors.green('/ AS'+ speaker.asn));
    });
    console.log('');
    console.log(colors.red.bold('Kuwait BGP Community'));
    console.log(colors.red.bold('--------------------'));
    community_speakers.forEach((speaker) => {
        console.log('%s %s', colors.bold(speaker.name), colors.green('/ AS'+ speaker.asn));
    });
    console.log('');
    console.log(colors.bold('ISPs/MNOs Total = ') + speakers.length + colors.bold(' // Community Total = ') + community_speakers.length + colors.green(colors.bold(' // Total = ' + (speakers.length + community_speakers.length))));
};