/* Edit the travel.js controller file to use the built-in Node.js file system component to read the
data file that you just created. Use the fs.readFileSync() method to retrieve the JSON. */

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways'});
};

module.exports = {
    travel
};