module.exports = function(req, res, next) {
    var isAdmin = false;

    if (isAdmin) {
        return next();
    }

    return res.notFound();
};