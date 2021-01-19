const express = require('express')
const Expense = require('../models/Expense')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const userId = req.user._id

    try {
        const expense = await Expense.find({ 'creator': userId })
            .select('-creator -__v -createdAt -updatedAt')
            .sort('-createdAt')
            .lean()

        res.json({ expense })

    } catch (error) {
        res.status(400).json({ error, msg: "cannot get expenses" })
    }
})

router.post('/', auth, async (req, res) => {
    const creator = req.user._id
    // const { title, amount, note, date } = req.body

    try {
        const expense = new Expense({ ...req.body, creator })
        await expense.save()
        res.json({ msg: 'expense added successfully' })

    } catch (error) {
        res.status(400).json({ error, msg: "Expense creation failed" })
    }
})

router.put('/', auth, async (req, res) => {
    // const { expId, title, amount, note, date } = req.body
    const { expId, ...payload } = req.body

    try {
        await Expense.findOneAndUpdate({ _id: expId }, { ...payload })
        res.json({ msg: 'expense modified successfully' })

    } catch (error) {
        res.status(400).json({ error, msg: "Expense updation failed" })
    }
})

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params

    try {
        await Expense.findByIdAndDelete(id)
        res.json({ msg: 'expense deleted successfully' })

    } catch (error) {
        res.status(400).json({ error, msg: "Expense deletion failed" })
    }
})

module.exports = router