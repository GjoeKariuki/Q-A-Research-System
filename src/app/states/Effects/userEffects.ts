import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import * as UserActions from '../Actions/userActions'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { error } from "console";




@Injectable()

export class userEffects{
    constructor( private action$: Actions , private userService:UserService , private router:Router){

    }

    RegisterUser$=createEffect( ()=> {
        return this.action$.pipe(
            ofType(UserActions.userRegistration),
            mergeMap( action=>{
                return this.userService.registerStudent(action.newUser).pipe(
                    tap(
                        ms=>{
                            this.router.navigate(['/jobs'])
                        }
                    ),
                    map(ms=> UserActions.userRegistrationSuccess({message:ms.message})),
                    catchError((res=> of(UserActions.userRegistrationFailure({message:res.message}))))
                )
            })
        )
    })
    loginStudent$=createEffect( ()=>{
        return this.action$.pipe(
            ofType(UserActions.userLogin),
            mergeMap( action =>{
                return this.userService.loginUser(action.loggedUser).pipe(
                    tap(
                        ms=>{
                            this.router.navigate(['/jobs'])
                        }
                    ),
                    map(msg=> UserActions.userLoginSuccess({message:msg.message})),
                    catchError(res =>of(UserActions.userLoginFailure({message:res.message})))
                )
            })

        )
    })
    getUserByID$ = createEffect( ()=>{
        return this.action$.pipe(
            ofType(UserActions.getUserByID),
            mergeMap( action =>{
                return this.userService.getUserByID(action.UserID).pipe(
                    map( user =>{
                        return UserActions.getUserByIDSuccess({user})
                    }),
                    catchError( error => of(UserActions.getUserByIDFailure({message:error})))
                )
            })
        )
    })

}