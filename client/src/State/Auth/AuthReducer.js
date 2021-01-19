const AuthReducer = (state, { type, payload }) => {
    switch (type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            }

        case "ACTION":
            console.log(payload)
            return {
                ...state,
                ...payload
            }

        case "ERROR":
            return {
                ...state,
                loading: false,
                error: "Something went wrong..."
            }

        default: return state
    }
}

export default AuthReducer