import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../State/Auth/AuthContextProvider'
import Loading from '../Common/Loading'
import { useEvalid, usePvalid } from '../Customs/useValidation'
import useInput from '../Customs/useInput'

const Login = () => {
    const history = useHistory()
    const { login } = useContext(AuthContext)
    const [email, eonChange, emsg, eerr] = useInput('', useEvalid)
    const [password, ponChange, pmsg, perr] = useInput('', usePvalid)

    const [logfail, setLogfail] = useState(false)
    const [loading, setLoading] = useState(false)

    let emailRef = useRef('')
    let passRef = useRef('')
    let SubRef = useRef('')

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    function emailKeyDown(e) {
        if (e.key === "Enter") passRef.current.focus()
    }

    function passKeyDown(e) {
        if (e.key === "Enter") SubRef.current.focus()
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eerr === false && perr === false) {
                setLoading(true)
                let res = await login({ email, password })
                history.push('/expense')
                if (!res) {
                    setLoading(false)
                    setLogfail(true)
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
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
                >Log In</button>
            </div>

            <h4>Don't have an account, <Link to="/signup">Sigh Up</Link></h4>
        </div>
    ) : (<Loading />)
}

export default Login