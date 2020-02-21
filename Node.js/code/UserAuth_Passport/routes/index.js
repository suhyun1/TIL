module.exports = function (passport) {   

    const route = require('express').Router();

    route.get('/', function (req, res) {
        res.render('index', { user: req.user });
    });

    return route;
}

