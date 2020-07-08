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
    activePatient: PatientInterface | null,
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

export const GET_PATIENT_INFO = "GET_PATIENT_INFO"
export const GET_PATIENT_INFO_COMPLETE = "GET_PATIENT_INFO_COMPLETE"
export const GET_PATIENT_INFO_FAILED = "GET_PATIENT_INFO_FAILED"

export const ADOPT_PATIENT = "ADOPT_PATIENT"
export const ADOPT_PATIENT_COMPLETE = "ADOPT_PATIENT_COMPLETE"
export const ADOPT_PATIENT_FAILED = "ADOPT_PATIENT_FAILED"

export const DROP_PATIENT = "DROP_PATIENT"
export const DROP_PATIENT_COMPLETE = "DROP_PATIENT_COMPLETE"
export const DROP_PATIENT_FAILED = "DROP_PATIENT_FAILED"


// Interface for the actions above (required by TS)
interface GetPhysiciansPatientsAction extends Action {
    payload: PatientInterface[]
}

interface GetPatientByNameAction extends Action {
    payload: PatientInterface[]
}

interface GetPatientByIDAction extends Action {
    payload: PatientInterface[]
}

interface AdoptDropPatientAction extends Action {
    payload: {
        patientID: string,
        physicianID: string
    }
}

// Implementing the userStateInterface, setting the initial state
const patientsInitState = {
    loadedPatients: [],
    physiciansPatients: [],
    activePatient: null,
    isUpdating: false,
    isFetching: false
} as PatientStateInterface

export function PatientReducer(state = patientsInitState, action: Action | GetPhysiciansPatientsAction | GetPatientByNameAction) {

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

        case GET_PATIENT_INFO:
            return {
                ...state,
                isFetching: true
            };


        case GET_PATIENT_INFO_COMPLETE:
            return {
                ...state,
                isFetching: false,
                activePatient: (action as GetPatientByIDAction).payload
            };


        case GET_PATIENT_INFO_FAILED:
            return {
                ...state,
                activePatient: null,
                isFetching: false
            };



        case ADOPT_PATIENT:
            return {
                ...state,
                isFetching: true
            };


        case ADOPT_PATIENT_COMPLETE: {

            return {
                ...state,
                isFetching: false,
                activePatient: {
                    ...state.activePatient,
                    physicians: [
                        (action as AdoptDropPatientAction).payload.physicianID,
                        ...state.activePatient?.physicians
                    ]
                }
            };
        }

        case ADOPT_PATIENT_FAILED:
            return {
                ...state,
                activePatient: null,
                isFetching: false
            };



        case DROP_PATIENT:
            return {
                ...state,
                isFetching: true
            };


        case DROP_PATIENT_COMPLETE: {

            let index = state.activePatient?.physicians?.indexOf((action as AdoptDropPatientAction).payload.physicianID);
            if (index === undefined) {
                return { ...state }
            } else {
                return {
                    ...state,
                    isFetching: false,
                    activePatient: {
                        ...state.activePatient,
                        physicians: [
                            ...state.activePatient?.physicians?.slice(0,index),
                            ...state.activePatient?.physicians?.slice(index + 1),
                        ]
                    }
                };
            }
        }

        case DROP_PATIENT_FAILED:
            return {
                ...state,
                activePatient: null,
                isFetching: false
            };



        case PURGE:
            return patientsInitState;

        default:
            return state
    }

}

export default PatientReducer;