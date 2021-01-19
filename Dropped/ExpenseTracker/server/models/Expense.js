const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    title : {
        type : String
    },

    amount : {
        type : Number
    },

    note : {
        type : String
    },

    date : {
        type : Date
    },

    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

}, {timestamps: true})

const Expense = mongoose.model('Expense', ExpenseSchema)

module.exports = Expense