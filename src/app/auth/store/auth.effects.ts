import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { environment } from "../../../environments/environment";

import * as AuthActions from './auth.actions'

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean  // optional field
}

@Injectable()
export class AuthEffects {
    @Effect()
    API_KEY = environment.firebaseAPIKey
    SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`

    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(this.SIGNIN_URL, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map(resData => {
                    const expirationDate = new Date(
                        new Date().getTime() + +resData.expiresIn*1000
                    )
                    return of(new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    }))
                }),
                catchError(error => {
                    return of()
                }), 
            )
        }),
        
    )

    constructor(private actions$: Actions, private http: HttpClient) {}
}