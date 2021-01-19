export default (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading : true 
            }

        case "LOGIN":
            return {
                ...state,
                _id : action.payload._id,
                name : action.payload.name,
                email : action.payload.email,
                auth : action.payload.auth,
                token : action.payload.token,                  
                loading : false 
            }
    
        case "LOGOUT":
            return {
                ...state,
                _id: "",
                name : "",
                email : "",
                auth : false,
                token : "",
                loading : false 
            }
               
        case "ERROR":
            return {
                ...state,
                loading : false,
                error : "Something went wrong..." 
            }

        default: return state
    }
}