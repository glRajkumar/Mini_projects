import React, { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { useNvalid, useEvalid, usePvalid } from '../Customs/useValidation'
import useInput from '../Customs/useInput'
import Loading from '../Common/Loading'

const Signup = () => {
    const [name, nonChange, nmsg, nerr] = useInput('', useNvalid)
    const [email, eonChange, emsg, eerr] = useInput('', useEvalid)
    const [password, ponChange, pmsg, perr] = useInput('', usePvalid)

    let nameRef = useRef('')
    let emailRef = useRef('')
    let passRef = useRef('')
    let SubRef = useRef('')

    const [logfail, setLogfail] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    function nameKeyDown(e) {
        if (e.key === "Enter") emailRef.current.focus()
    }

    function emailKeyDown(e) {
        if (e.key === "Enter") passRef.current.focus()
    }

    function passKeyDown(e) {
        if (e.key === "Enter") SubRef.current.focus()
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (nerr === false && eerr === false && perr === false) {
                setLoading(true)
                console.log({ name, email, password })
                let h = await axios.post("/user/register", { name, email, password })
                console.log(h)
                history.push("/login")
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            setLogfail(true)
        }
    }

    return !loading ? (
        <div className="form-box">
            {
                logfail &&
                <div className="alert">
                    Invalid Sign Up credentials
                </div>
            }

            <label htmlFor="name"> Name </label>
            <input
                className="input-box"
                ref={nameRef}
                onKeyDown={nameKeyDown}
                name="name"
                type="text"
                value={name}
                onChange={nonChange}
            />
            {
                nerr && <div className="alert"> {nmsg} </div>
            }

            <label htmlFor="email"> Email </label>
            <input
                className="input-box"
                ref={emailRef}
                onKeyDown={emailKeyDown}
                name="email"
                type="email"
                value={email}
                onChange={eonChange}
            />
            {
                eerr && <div className="alert"> {emsg} </div>
            }

            <label htmlFor="password"> Password </label>
            <input
                className="input-box"
                ref={passRef}
                onKeyDown={passKeyDown}
                name="password"
                type="password"
                value={password}
                onChange={ponChange}
            />
            {
                perr && <div className="alert"> {pmsg} </div>
            }

            <div>
                <button
                    className="gen-but"
                    ref={SubRef}
                    onClick={onSubmit}
                >Sign Up</button>
            </div>

            <h4>Already have an account, <Link to="/login">Log In</Link></h4>

        </div>
    ) : (<Loading />)
}

export default Signup