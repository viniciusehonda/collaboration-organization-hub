import { Account } from "@/domain/models/account";
import { LocalStorageAdapter } from "@/infra/cache/localStorageAdapter";
import { configureStore } from "@reduxjs/toolkit"


export interface RootState {
    isLoggedIn: boolean,
    account: Account | null
}

const initialRootState: RootState = {
    isLoggedIn: false,
    account: null
}

const rootReducer = (state: RootState = initialRootState, action: any): RootState => {

    const { type, payload } = action;

    switch (type) {
        case 'LOGIN_SUCCESS':

            var newAccount = payload.account as Account;

            if (newAccount) {
                var localStorage = new LocalStorageAdapter();
                localStorage.set("_authData", newAccount)

                return {
                    ...state,
                    isLoggedIn: true,
                    account: newAccount
                };
            }

            return state;
        case 'LOGOUT':

            var localStorage = new LocalStorageAdapter();
            localStorage.set("_authData", {});

            return {
                ...state,
                isLoggedIn: false,
                account: null
            };
        default:
            var localStorage = new LocalStorageAdapter();
            let authData = localStorage.get("_authData");

            if (authData != null) {
                return {
                    ...state,
                    isLoggedIn: true,
                    account: authData as Account
                }
            }
            return state;
    }
}

const store = configureStore({ reducer: rootReducer })
export default store;