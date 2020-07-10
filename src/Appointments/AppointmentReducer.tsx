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

export const CREATE_APPOINT = "CREATE_APPOINT"
export const CREATE_APPOINT_COMPLETE = "CREATE_APPOINT_COMPLETE"
export const CREATE_APPOINT_FAILED = "CREATE_APPOINT_FAILED"

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

interface AcceptRejectAppointmentAction extends Action {
    payload: AppointmentInterface
}

interface CreateAppointmentAction extends Action {
    payload: AppointmentInterface
}



// Implementing the userStateInterface, setting the initial state
const appointmentInitState = {
    todaysAppointments: [],
    loadedAppoints: [],
    loadedInterval: [null, null],
    isUpdating: false,
    isFetching: false
} as AppointmentStateInterface

export function AppointmentReducer(state = appointmentInitState, action: Action | GetTodaysAppointAction | GetAppointsBetweenAction | AcceptRejectAppointmentAction) {

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


        case GET_APPOINTMENTS_BETWEEN_FAILED:
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
            {            //If the action is evoked while the appointment is still on the loaded array, it needs to be updated, 
                //  otherwise the state has to be updated via the GET_APPOINTMENTS_BETWEEN action
                let foundIndex = state.loadedAppoints.findIndex(
                    element => element._id == (action as AcceptRejectAppointmentAction).payload._id
                )
                console.log("REDUCER DEBUG")
                console.log("appointment to modify: ", (action as AcceptRejectAppointmentAction).payload)
                console.log("foundIndex: ", foundIndex)
                console.log("appointment[foundindex]: ", state.loadedAppoints[foundIndex])

                if (foundIndex === -1)
                    return {
                        ...state,
                        isUpdating: false
                    };
                else
                    return {
                        ...state,
                        isUpdating: false,
                        loadedAppoints: [
                            ...state.loadedAppoints.slice(0, foundIndex),
                            {
                                ...state.loadedAppoints[foundIndex],
                                status: "ACCEPTED"
                            },
                            ...state.loadedAppoints.slice(foundIndex + 1)
                        ]
                    };
            }
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
            {            //If the action is evoked while the appointment is still on the loaded array, it needs to be updated, 
                //  otherwise the state has to be updated via the GET_APPOINTMENTS_BETWEEN action
                let foundIndex = state.loadedAppoints.findIndex(
                    element => element._id == (action as AcceptRejectAppointmentAction).payload._id
                )
                console.log("REDUCER DEBUG REJECT")
                console.log("appointment to modify: ", (action as AcceptRejectAppointmentAction).payload)
                console.log("foundIndex: ", foundIndex)
                console.log("appointment[foundindex]: ", state.loadedAppoints[foundIndex])

                if (foundIndex === -1)
                    return {
                        ...state,
                        isUpdating: false
                    };
                else
                    return {
                        ...state,
                        isUpdating: false,
                        loadedAppoints: [
                            ...state.loadedAppoints.slice(0, foundIndex),
                            {
                                ...state.loadedAppoints[foundIndex],
                                status: "REJECTED"
                            },
                            ...state.loadedAppoints.slice(foundIndex + 1)
                        ]
                    };
            }

        case REJECT_APPOINTMENT_FAILED:
            return {
                ...state,
                isUpdating: false
            };


        case CREATE_APPOINT:
            return {
                ...state,
                isUpdating: true
            }

        case CREATE_APPOINT_COMPLETE:
            return {
                ...state,
                isUpdating: false,
                loadedAppoints: [...state.loadedAppoints, (action as CreateAppointmentAction).payload]
            }

        case CREATE_APPOINT_FAILED:
            return {
                ...state,
                isUpdating: false
            }

        case PURGE:
            return appointmentInitState;

        default:
            return state
    }

}

export default AppointmentReducer;