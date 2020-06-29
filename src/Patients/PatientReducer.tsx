import { Action } from 'redux'
import { PURGE } from 'redux-persist'
import { PatientInterface } from "../User/components/Patients"


//The interface that exports the state of the UserReducer as UserReducer
//  so that it can be used elsewhere
export interface PatientReducer {
    PatientReducer: PatientStateInterface
}

//Interface for the state used by this reducer (required by TS)
export interface PatientStateInterface {
    loadedPatients: PatientInterface[],
    physiciansPatients: PatientInterface[],
    isUpdating: boolean,
    isFetching: boolean
};

// Action Types
export const GET_PHYSICIANS_PATIENTS = "GET_PHYSICIANS_PATIENTS"
export const GET_PHYSICIANS_PATIENTS_COMPLETE = "GET_PHYSICIANS_PATIENTS_COMPLETE"
export const GET_PHYSICIANS_PATIENTS_FAILED = "GET_PHYSICIANS_PATIENTS_FAILED"

export const GET_PATIENTS_WITH_NAME = "GET_PATIENTS_WITH_NAME"
export const GET_PATIENTS_WITH_NAME_COMPLETE = "GET_PATIENTS_WITH_NAME_COMPLETE"
export const GET_PATIENTS_WITH_NAME_FAILED = "GET_PATIENTS_WITH_NAME_FAILED"


// Interface for the actions above (required by TS)
interface GetPhysiciansPatientsAction extends Action {
    payload: PatientInterface[]
}

interface GetPatientByNameAction extends Action {
    payload: PatientInterface[]
}

// Implementing the userStateInterface, setting the initial state
const appointmentInitState = {
    loadedPatients: [],
    physiciansPatients: [],
    isUpdating: false,
    isFetching: false
} as PatientStateInterface

export function PatientReducer(state = appointmentInitState, action: Action | GetPhysiciansPatientsAction | GetPatientByNameAction) {

    switch (action.type) {

        case GET_PHYSICIANS_PATIENTS:
            return {
                ...state,
                isFetching: true
            };


        case GET_PHYSICIANS_PATIENTS_COMPLETE:
            return {
                ...state,
                isFetching: false,
                physiciansPatients: (action as GetPhysiciansPatientsAction).payload
            };


        case GET_PHYSICIANS_PATIENTS_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case GET_PATIENTS_WITH_NAME:
            return {
                ...state,
                isFetching: true
            };


        case GET_PATIENTS_WITH_NAME_COMPLETE:
            return {
                ...state,
                isFetching: false,
                loadedPatients: (action as GetPatientByNameAction).payload
            };


        case GET_PATIENTS_WITH_NAME_FAILED:
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

export default PatientReducer;