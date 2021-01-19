import React, { createContext, useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AuthReducer from './AuthReducer'

export const AuthContext = createContext()

const AuthContextProvider = (props) =>{
  const [ firstRender, setFirstRender ] = useState(true)

  const inialState = {
    _id : "",
    name : "",
    email : "",
    token : "",
    auth : false,
    loading : true,
    error : ""
  }

  const [ state, dispatch ] = useReducer(AuthReducer, inialState)
  const history = useHistory()

  let headers = {
    Authorization: "Bearer " + state.token
  }

  const logged = async () => {
    try {
      const existed = localStorage.getItem("expense_token")
      const exp = localStorage.getItem("expense_token_exp")
      const valid = 64800000 - (Date.now() - exp)

      if(existed){
        if (valid > 0) {
          const res = await axios.get("/user/me",{ 
            headers : { 
              Authorization: "Bearer " + existed 
            }
          })
  
          let { _id, name, email } = res.data
  
          const payload = {
            _id,
            name ,
            email ,
            auth : true,
            token : existed
          }
  
          dispatch({ type : "LOGIN", payload })
          history.push("/")

        }else{
          history.push("/login")
          localStorage.removeItem("expense_token")
          localStorage.removeItem("expense_token_exp")
        }
      }else{
        history.push("/signup")
      }

    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }
   
  const oneTimeRender = () =>{
    logged()
    setFirstRender(false)
  }

  if (firstRender) oneTimeRender()
  
  const login = async (formData) => {
    try {
      const res = await axios.post("/user/login", formData)
      const {token, user} = await res.data

      const payload = {
        _id: user._id,
        name : user.name ,
        email : user.email ,
        auth : true,
        token 
      }

      localStorage.setItem("expense_token", token)
      localStorage.setItem("expense_token_exp", Date.now())
      dispatch({ type : "LOGIN", payload })
      history.push("/")                    
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
      throw new Error(error)
    }
  }

  const logout = async () =>{
    try {
      await axios.post("/user/logout",{},{headers})
      localStorage.removeItem("expense_token")
      localStorage.removeItem("expense_token_exp")
      dispatch({ type : "LOGOUT" })
      history.push("/login")
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }

  return(
      <AuthContext.Provider value={{
        _id : state._id,
        name : state.name, 
        email : state.email, 
        token : state.token,
        auth : state.auth, 
        headers, 
        login,
        logout
      }}>
          {props.children}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider