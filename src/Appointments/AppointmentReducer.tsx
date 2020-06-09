import { Action } from 'redux'
import { PURGE } from 'redux-persist'

//Represents a User structure that will be part of the app state
export interface AppointmentInterface {
    _id: string | null,
    startDate: Date | null,
    endDate: Date | null,
    location: string | null,
    status: string | null,
    patient: string | null,
    physician: string | null
}

//The interface that exports the state of the UserReducer as UserReducer
//  so that it can be used elsewhere
export interface AppointmentReducer {
    AppointmentReducer: AppointmentStateInterface
}

//Interface for the state used by this reducer (required by TS)
export interface AppointmentStateInterface {
    todaysAppointments: AppointmentInterface[],
    isUpdating: boolean,
    isFetching: boolean
};

// Action Types
export const GET_TODAYS_APPOINTMENTS = "GET_TODAYS_APPOINTMENTS"
export const GET_TODAYS_APPOINTMENTS_COMPLETE = "GET_TODAYS_APPOINTMENTS_COMPLETE"
export const GET_TODAYS_APPOINTMENTS_FAILED = "GET_TODAYS_APPOINTMENTS_FAILED"

// Interface for the actions above (required by TS)
interface GetTodaysAppointAction extends Action {
    payload: AppointmentInterface[]
}


// Implementing the userStateInterface, setting the initial state
const appointmentInitState = {
    todaysAppointments: [] as AppointmentInterface[],
    isUpdating: false,
    isFetching: false
} as AppointmentStateInterface

export function AppointmentReducer(state = appointmentInitState, action: Action | GetTodaysAppointAction) {

    switch (action.type) {

        case GET_TODAYS_APPOINTMENTS:
            return {
                ...state,
                isFetching: true
            };


        case GET_TODAYS_APPOINTMENTS_COMPLETE:
            return {
                ...state,
                isFetching: false,
                todaysAppointments: (action as GetTodaysAppointAction).payload
            };


        case GET_TODAYS_APPOINTMENTS_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case PURGE:
            return appointmentInitState;

        default:
            return state
    }

}

export default AppointmentReducer;