const initialState={
    user: null
}

const SET_USER= "SET_USER"

//action type 
export function setUser(user){
    return{
        type: SET_USER,
        payload: user
    }
}

//action builder 
export default function authReducer(state= initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload}
        default:
            return {...state}
    }
}
