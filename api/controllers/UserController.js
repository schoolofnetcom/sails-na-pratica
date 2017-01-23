let _ = require('lodash');
let _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {
    create: (req, res, next) => {
        sails.services.passport.protocols.local.register(req.body, function (err, user) {
            if (err)
                return res.negotiate(err);

            return res.redirect('/');
        });
    }
});