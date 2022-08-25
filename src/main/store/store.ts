import { configureStore } from "@reduxjs/toolkit"


export interface RootState {
    isLoggedIn: boolean
}

const initialRootState: RootState = {
    isLoggedIn: false
}

const rootReducer = (state: RootState = initialRootState, action: any): RootState => {

    const { type, payload } = action;

    switch (type) {
        case 'LOGIN_SUCCESS':
            console.log("login_sucess");
            console.log(state);
            return {
                ...state,
                isLoggedIn: true
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return state;
    }
}

const store = configureStore({ reducer: rootReducer })
export default store;