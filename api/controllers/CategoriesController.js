/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res) => {
        Categories
            .find()
            .then((categories) => {
                return res.view({
                    categories
                });
            })
            .catch((err) => {
                return res.send(err, 400);
            });
    },

    new: (req, res) => {
        res.view();
    },

    create: (req, res) => {
        let category = {
            name: req.param('name')
        };

        return Categories
                    .create(category)
                    .then((data) => {
                        return res.redirect('categories');
                    })
                    .catch((err) => {
                        return res.view('categories/new', {
                            status: 500,
                            statusDesc: 'Could not find',
                            category
                        })
                    })
    },

    destroy: (req, res) => {
        Categories
            .find()
            .where({
                'id': req.param('id')
            })
            .then((data) => {
                if (!data) {
                    res.send(404);
                }

                return data[0]
                        .destroy()
                        .then((category) => {
                            return res.redirect('categories');
                        })
                        .catch((err) => {
                            return res.send(500, 'Could not delete');
                        })
            })
            .catch((err) => {
                return res.send(500)
            })
    },

    edit: (req, res) => {
        Categories
            .findOne({
                'id': req.param('id')
            })
            .then((category) => {
                return res.view('categories/edit', {
                    category
                })
            })
            .catch((err) => {
                res.send(500, err);
            })
    },

    update: (req, res) => {
        let category = {
            name: req.param('name')
        };

        Categories
            .update(req.param('id'), category)
            .then((data) => {
                return res.redirect('categories');
            })
            .catch((err) => {
                return res.view('categories/edit', {
                    status: 500,
                    statusDesc: 'Could not find',
                    category
                })
            })
    }
};

