import React, { useState } from 'react'
import axios from 'axios'
import remove from '../img/expense/delete.png'
import '../css/update.css'

function UpdateExp({ headers, pi, pt, pa, pn, pd = Date.now, onUpdate }) {
    const [title, setTitle] = useState(pt)
    const [amount, setAmount] = useState(pa)
    const [note, setNote] = useState(pn)
    const [date, setDate] = useState(pd)

    const Submit = (e) => {
        e.preventDefault()
        axios.put('/expense', { expId: pi, title, amount, note, date }, { headers })
            .then(() => {
                onUpdate()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="update">
            <form>
                <img
                    className="update-rem"
                    src={remove}
                    alt="cancel"
                    onClick={onUpdate}
                />

                <input
                    className="input-box"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <input
                    className="input-box"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />

                <input
                    className="input-box"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                />

                <input
                    className="input-box"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                />

                <button onClick={(e) => Submit(e)}> Update </button>
            </form>
        </div>
    )
}

export default UpdateExp