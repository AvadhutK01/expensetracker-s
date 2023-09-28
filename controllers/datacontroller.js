const path = require('path');
const expense = require('../models/expensedb');
exports.getIndex = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
}
exports.postData = (req, res, next) => {
    let amount = req.body.Amountval;
    let Desc = req.body.Descval;
    let category = req.body.Categoryval;
    const expenseData = new expense(null, amount, Desc, category);
    expense.create(
        {
            amount: amount,
            desc: Desc,
            category: category
        }
    ).then(result => {
        res.redirect('/')
    }).catch(err => {
        console.log(err);
    })
};
exports.getSingleData = (req, res, next) => {
    let id = req.body.id;
    expense.findOne({
        where: {
            id: id
        }
    }).then(
        (result) => {
            const data = result.dataValues;
            console.log(data);
            res.json(data);
        }
    )
}
exports.getData = (req, res, next) => {
    expense.findAll()
        .then(expense => {
            const ExpenseData = expense.map(expense => expense.dataValues);
            res.json(ExpenseData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error fetching expense data' });
        });
};
exports.deleteExpense = async (req, res, next) => {
    try {
        let id = req.body.id;
        const deletedExpense = await expense.destroy({
            where: {
                id: id
            }
        });

        if (deletedExpense > 0) {
            res.json({ message: 'Data deleted successfully', Id: id });
        } else {
            res.status(404).json({ message: 'Data not found', Id: id });
        }
    } catch (error) {
        console.error('Error deleting Data:', error);
    }
};
exports.updateData = async (req, res, next) => {
    try {
        let id = req.body.id;
        let amount = req.body.Amountval;
        let Desc = req.body.Descval;
        let category = req.body.Categoryval;
        const data = await expense.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'data not found', id });
        }
        data.amount = amount;
        data.desc = Desc;
        data.category = category;
        await data.save();
        return res.json({ message: 'data updated successfully', id });
    } catch (error) {
        console.error('Error updating data:', error);
        return res.status(500).json({ error: 'Error updating data' });
    }
};

