const routes = require('next-routes')();

routes
.add('/compaigns/new','/compaigns/new')
.add('/compaigns/:address','/compaigns/show')

module.exports = routes;
