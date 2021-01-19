import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import AuthReducer from './AuthReducer'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const inialState = {
    _id: "",
    name: "",
    email: "",
    token: "",
    auth: false,
    loading: true,
    error: ""
  }

  const [state, dispatch] = useReducer(AuthReducer, inialState)

  const headers = {
    Authorization: "Bearer " + state.token
  }

  const login = async (formData) => {
    try {
      const res = await axios.post("/user/login", formData)

      const payload = {
        ...res.data,
        email: formData.email,
        auth: true,
        loading: false
      }

      localStorage.setItem("mini_token", res.data.token)
      localStorage.setItem("mini_token_exp", Date.now())
      dispatch({ type: "ACTION", payload })
      return true

    } catch (error) {
      console.log(error)
      dispatch({ type: "ERROR" })
      return false
    }
  }

  const logout = async () => {
    try {
      await axios.post("/user/logout", {}, { headers })
      localStorage.removeItem("mini_token")
      localStorage.removeItem("mini_token_exp")
      dispatch({ type: "ACTION", payload: inialState })
      return true

    } catch (error) {
      console.log(error)
      dispatch({ type: "ERROR" })
      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      headers,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider