import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../State/Auth/AuthContextProvider"
import axios from 'axios'
import CreateExp from './CreateExp'
import UpdateExp from './UpdateExp'
import edit from '../img/expense/edit.png'
import remove from '../img/expense/delete.png'
import rupee from '../img/expense/rupee.png'
import '../css/expense.css'

function Expense() {
    const { headers } = useContext(AuthContext)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState('')
    const [date, setDate] = useState('')
    const [change, setChange] = useState(true)
    const [expense, setExp] = useState([])

    useEffect(() => {
        axios.get('/expense', { headers })
            .then((res) => {
                setExp(res.data.expense)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, change])

    const onEdit = (id, title, amount, note, date) => {
        setId(id)
        setTitle(title)
        setAmount(amount)
        setNote(note)
        setDate(date)
    }

    const onDelete = (_id) => {
        axios.delete(`/expense/${_id}`, { headers })
            .then(() => {
                const newData = expense.filter(exp => exp._id !== _id)
                setExp(newData)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const expValue = expense.reduce((prev, current) => prev + current.amount, 0)

    return (
        <div id="exp-app">
            <div id="expense-main">
                <nav>
                    <div id="exp-logo"> MY EXPENSES </div>
                    <div id="total">
                        <p> Total </p>
                        <p></p>
                        <p> {expense.length > 0 ? expValue : 0} </p>
                    </div>
                </nav>

                {
                    id &&
                    <UpdateExp
                        headers={headers}
                        pi={id}
                        pt={title}
                        pa={amount}
                        pn={note}
                        pd={date}
                        onUpdate={() => setId('')}
                    />
                }

                <div id="exp-hr"></div>

                <div className="exp-body">
                    <div className="exp-form">
                        <CreateExp OnChange={() => { setChange(prev => !prev) }} />
                    </div>

                    <div id="overflowdiv">
                        {
                            expense.length > 0 ?
                                <div>
                                    {
                                        expense.map(exp => (
                                            <div className="exp" key={exp._id}>
                                                <div
                                                    className="edit"
                                                    onClick={() => onEdit(exp._id, exp.title, exp.amount, exp.note, exp.date)}
                                                >
                                                    <img src={edit} alt="edit" />
                                                    <p>Edit</p>
                                                </div>

                                                <div className="exp-box">
                                                    <p className="exp-light"> {new Date(exp.date).toLocaleString('en-GB')} </p>
                                                    <div className="exp-title">
                                                        <p> {exp.title} </p>
                                                        <div className="rupee">
                                                            <img src={rupee} alt="rupee" />
                                                            <p> {exp.amount} </p>
                                                        </div>
                                                    </div>
                                                    <div className="exp-light">
                                                        <strong>NOTE :</strong>
                                                        <p>{exp.note}</p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="edit"
                                                    onClick={() => { onDelete(exp._id) }}
                                                >
                                                    <img src={remove} alt="remove" />
                                                    <p>Remove</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                : <h3 className="no-exp">No details to show</h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expense