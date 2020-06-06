import { Action } from 'redux'
import { PURGE } from 'redux-persist'

//Represents a User structure that will be part of the app state
export interface UserInterface {
    _id: string | null,
    role: string | null,
    specialty: [string] | null,
    
    firstName: string | null,
    lastName: string | null,
    gender: string | null,
    email: string | null,
    phone: string | null,
    address: string | null,
    imageUrl: string | null,
    token: string | null

}

//The interface that exports the state of the UserReducer as UserReducer
//  so that it can be used elsewhere
export interface UserReducer {
    UserReducer: UserStateInterface
}

//Interface for the state used by this reducer (required by TS)
export interface UserStateInterface {
    user: UserInterface | null,
    isLogging: boolean,
    isUpdating: boolean,
    isFetching: boolean
};

// Action Types
export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGIN_COMPLETE = "USER_LOGIN_COMPLETE"
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED"

// Interface for the actions above (required by TS)
interface LoginAction extends Action {
    payload: UserInterface
}


// Implementing the userStateInterface, setting the initial state
const userInitState = {
    user: null,
    isLogging: false,
    isUpdating: false,
    isFetching: false
} as UserStateInterface

export function UserReducer(state = userInitState, action: Action | LoginAction) {

    switch (action.type) {

        case USER_LOGIN:
            return {
                ...state,
                isLogging : true
            };


        case USER_LOGIN_COMPLETE:
            return {
                ...state,
                isLogging : false,
                user: {
                    ...state.user,
                    _id: (action as LoginAction).payload._id,
                    role: (action as LoginAction).payload.role,
                    specialty: (action as LoginAction).payload.specialty,
                    token: (action as LoginAction).payload.token,
                    firstName: null,
                    lastName: null,
                    gender: null,
                    email: null,
                    phone: null,
                    address: null,
                    imageUrl: "default_user.png"
                }
            };


        case USER_LOGIN_FAILED:
            return {
                ...state,
                isLogging : false
            };

        case PURGE:
            return userInitState;

        default:
            return state
    }

}

export default UserReducer;