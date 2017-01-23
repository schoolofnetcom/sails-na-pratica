/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: (req, res) => {
        return res.view();
    },
    register: (req, res) => {
        return res.view();
    },
    logout: (req, res) => {
        if (req.isAuthenticated()) {
            req.session.destroy((err) => {
                if (err) {
                    return
                }

                req.logout();

                return res.redirect('login');
            });
        } else {
            return res.redirect('login');
        }
    }
};

