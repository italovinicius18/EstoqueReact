const {Router} = require('express');

const routes = new Router();

routes.get('/status', (req, res) => {
    res.send({message: 'Server is running'});
});

module.exports = routes;