/**
 * BillsController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: (req, res) => {
        Bills
            .find()
            .populate('category')
            .then((bills) => {
                res.view({
                    bills
                })
            })
    },

	new: (req, res) => {
        Categories
            .find()
            .then((categories) => {
                return res.view({
                    categories
                });
            });
    },

    create: (req, res) => {
        Categories
            .findOne({
                id: req.param('category')
            })
            .then((category) => {
                Bills
                    .create({
                        name: req.param('name'),
                        value: req.param('value'),
                        category: category.id
                    })
                    .then((bill) => {
                        return res.redirect('bills')
                    })
            })
    },

    destroy: (req, res) => {
        Bills
            .findOne({
                id: req.param('id')
            })
            .then((bill) => {
                bill
                    .destroy()
                    .then((data) => {
                        res.redirect('bills');
                    })
            })
    },

    edit: (req, res) => {
        Bills
            .findOne({
                id: req.param('id')
            })
            .populate('category')
            .then((bill) => {
                Categories
                    .find()
                    .then((categories) => {
                        return res.view('bills/edit', {
                            bill,
                            categories
                        })
                    });
            })
    },

    update: (req, res) => {
        Categories
            .findOne({
                id: req.param('category')
            })
            .then((category) => {
                Bills
                    .update(req.param('id'), {
                        name: req.param('name'),
                        value: req.param('value'),
                        category: category.id
                    })
                    .then((data) => {
                        return res.redirect('bills')
                    })
            })

    }
};

