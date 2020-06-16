import { Action } from 'redux'
import { PURGE } from 'redux-persist'
import { PatientInterface } from "../User/components/Patients"

//Represents a User structure that will be part of the app state
export interface AppointmentInterface {
    _id: string,
    startDate: Date,
    endDate: Date,
    location: string,
    status: string,
    patient: string,
    physician: string,
    objective: string,
    diagnostic: string,
    treatment: string,
    patientsInfo: PatientInterface

}

//The interface that exports the state of the UserReducer as UserReducer
//  so that it can be used elsewhere
export interface AppointmentReducer {
    AppointmentReducer: AppointmentStateInterface
}

//Interface for the state used by this reducer (required by TS)
export interface AppointmentStateInterface {
    todaysAppointments: AppointmentInterface[],
    loadedAppoints: AppointmentInterface[],
    loadedInterval: [Date | null, Date | null], //startDate endDate
    isUpdating: boolean,
    isFetching: boolean
};

// Action Types
export const GET_TODAYS_APPOINTMENTS = "GET_TODAYS_APPOINTMENTS"
export const GET_TODAYS_APPOINTMENTS_COMPLETE = "GET_TODAYS_APPOINTMENTS_COMPLETE"
export const GET_TODAYS_APPOINTMENTS_FAILED = "GET_TODAYS_APPOINTMENTS_FAILED"

export const GET_APPOINTMENTS_BETWEEN = "GET_APPOINTMENTS_BETWEEN"
export const GET_APPOINTMENTS_BETWEEN_COMPLETE = "GET_APPOINTMENTS_BETWEEN_COMPLETE"
export const GET_APPOINTMENTS_BETWEEN_FAILED = "GET_APPOINTMENTS_BETWEEN_FAILED"

export const ACCEPT_APPOINTMENT = "ACCEPT_APPOINTMENT"
export const ACCEPT_APPOINTMENT_COMPLETE = "ACCEPT_APPOINTMENT_COMPLETE"
export const ACCEPT_APPOINTMENT_FAILED = "ACCEPT_APPOINTMENT_FAILED"

export const REJECT_APPOINTMENT = "REJECT_APPOINTMENT"
export const REJECT_APPOINTMENT_COMPLETE = "REJECT_APPOINTMENT_COMPLETE"
export const REJECT_APPOINTMENT_FAILED = "REJECT_APPOINTMENT_FAILED"


// Interface for the actions above (required by TS)
interface GetTodaysAppointAction extends Action {
    payload: AppointmentInterface[]
}

interface GetAppointsBetweenAction extends Action {
    payload: {
        appointments: AppointmentInterface[],
        interval: [Date, Date]
    }
}

interface AcceptAppointmentAction extends Action {
    payload: number
}

interface RejectAppointmentAction extends Action {
    payload: number
}


// Implementing the userStateInterface, setting the initial state
const appointmentInitState = {
    todaysAppointments: [],
    loadedAppoints: [],
    loadedInterval: [null, null],
    isUpdating: false,
    isFetching: false
} as AppointmentStateInterface

export function AppointmentReducer(state = appointmentInitState, action: Action | GetTodaysAppointAction | GetAppointsBetweenAction) {

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


        case GET_APPOINTMENTS_BETWEEN:
            return {
                ...state,
                isFetching: true
            };

        case GET_APPOINTMENTS_BETWEEN_COMPLETE:
            return {
                ...state,
                isFetching: false,
                loadedAppoints: (action as GetAppointsBetweenAction).payload.appointments,
                loadedInterval: (action as GetAppointsBetweenAction).payload.interval
            };


        case GET_APPOINTMENTS_BETWEEN_COMPLETE:
            return {
                ...state,
                isFetching: false
            };

        case ACCEPT_APPOINTMENT:
            return {
                ...state,
                isUpdating: true
            };

        case ACCEPT_APPOINTMENT_COMPLETE:
            return {
                ...state,
                isUpdating: false,
                loadedAppoints: [...state.loadedAppoints.slice(0, (action as AcceptAppointmentAction).payload),
                {
                    ...state.loadedAppoints[(action as AcceptAppointmentAction).payload],
                    status: "ACCEPTED"
                },
                ...state.loadedAppoints.slice((action as AcceptAppointmentAction).payload + 1),]
            };

        case ACCEPT_APPOINTMENT_FAILED:
            return {
                ...state,
                isUpdating: false
            };

        case REJECT_APPOINTMENT:
            return {
                ...state,
                isUpdating: true
            };

        case REJECT_APPOINTMENT_COMPLETE:
            return {
                ...state,
                isUpdating: false,
                loadedAppoints: [...state.loadedAppoints.slice(0, (action as AcceptAppointmentAction).payload),
                {
                    ...state.loadedAppoints[(action as AcceptAppointmentAction).payload],
                    status: "REJECTED"
                },
                ...state.loadedAppoints.slice((action as AcceptAppointmentAction).payload + 1),]
            };

        case REJECT_APPOINTMENT_FAILED:
            return {
                ...state,
                isUpdating: false
            };


        case PURGE:
            return appointmentInitState;

        default:
            return state
    }

}

export default AppointmentReducer;