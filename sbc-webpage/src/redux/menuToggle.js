const initialState={
    showMenu: false
}

const MENU= 'MENU'

export function setMenu(showMenu){
    return{
        type: MENU,
        payload: showMenu
    }
}

export default function menuReducer(state= initialState, action){
    switch(action.type){
        case MENU:
            return {...state, menu:action.payload}
        default:
            return {...state}
    }
}
