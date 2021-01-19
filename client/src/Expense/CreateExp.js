import React, { useContext, useState } from 'react'
import { AuthContext } from '../State/Auth/AuthContextProvider'
import axios from 'axios'
import add from '../img/expense/add.png'

function CreateExp({ OnChange }) {
    const { headers } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState('')
    const [date, setDate] = useState('')
    const [alertInput, setAlert] = useState(false)

    const Submit = (e) => {
        e.preventDefault()
        if (title !== '' && note !== '' && date !== '') {
            axios.post('/expense', { title, amount, note, date }, { headers })
                .then((res) => {
                    console.log(res.data)
                    setTitle('')
                    setAmount(0)
                    setNote('')
                    setDate('')
                    setAlert(false)
                    OnChange()
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            setAlert(true)
        }
    }

    return (
        <form id="create">
            {
                alertInput &&
                <div className="alert">Please fill all the fields </div>
            }

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />

            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note"
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
            />

            <button onClick={(e) => Submit(e)}> <img className="icons" src={add} alt="add" /> ADD EXPENSE</button>
        </form>
    )
}

export default CreateExp