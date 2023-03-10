import { Action } from "@ngrx/store"

// export const LOGIN = 'LOGIN'
// export const LOGOUT = 'LOGOUT'

export const LOGIN = '[Auth] Login'
export const LOGOUT = '[Auth] Logout'

// side effect actions
export const LOGIN_START = '[Auth] Login Start'
export const LOGIN_FAIL = '[Auth] Login Fail'

export type AuthActions = Login | Logout | LoginStart | LoginFail

export class Login implements Action {
    readonly type = LOGIN

    constructor(public payload: { 
        email: string,  
        userId: string,
        token: string,
        expirationDate: Date
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT
}

// effect actions
export class LoginStart implements Action {
    readonly type = LOGIN_START

    constructor(public payload: { email: string, password: string }) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL

    constructor(public payload: string) {}
}