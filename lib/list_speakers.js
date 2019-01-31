const colors = require('colors');
const { speakers } = require('./values');

module.exports = function() {
    console.log('Kuwait BGP Speakers');
    console.log('-------------------');

    // list on separate lines
    speakers.forEach((speaker) => {
        console.log('%s %s', colors.bold(speaker.name), colors.yellow('/ AS'+ speaker.asn));
    });
};