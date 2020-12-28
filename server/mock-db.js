var roles  = require('./roles.json');
var clients = require('./clients.json');
var cases  = require('./cases.json');
var employees = require('./employees.json');
var evidences = require('./evidences.json');
var courtTypes = require('./courtTypes.json');
var courts = require('./courts.json');
var last = require('./last.json');
var councils = require('./councils.json');
var notes = require('./notes.json');
// and so on

module.exports = function() {
return {
roles  : roles,
clients : clients,
cases  : cases,
employees : employees,
evidences: evidences,
courtTypes: courtTypes, 
courts: courts,
last: last,
councils: councils,
notes: notes
// and so on
 }
}