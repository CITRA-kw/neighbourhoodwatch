const colors = require('colors');
const { speakers } = require('./values.js');

module.exports = function() {
    console.log('');
    console.log('Kuwait BGP Speakers');
    console.log('-------------------');

    // list on separate lines
    speakers.forEach((speaker) => {
        console.log('%s %s', colors.bold(speaker.name), colors.green('/ AS'+ speaker.asn));
    });
    console.log('');
};