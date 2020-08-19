import { Action } from 'redux'
import { PURGE } from 'redux-persist'
import { PatientInterface } from "../User/components/Patients"

//Represents a User structure that will be part of the app state
export interface PhysioEvalInterface {
    _id?: string,
    patientName?: string,
    patientEmail?: string,
    patient: string,
    currentState: string,
    previousIssues: string,
    bodyChat: {
        x: number,
        y: number,
        intensity: number
    },
    observations: string,
    articulations: [{
        articulation: string,
        movement: string,
        adm: string,
        amplitude: number,
        endFeel: string
    }],
    muscles: [
        {
            muscle: string,
            movement: string,
            adm: string,
            intensity: string
        }
    ],
    perimeter: [
        {
            bodyPart: string,
            rightMeasure: number,
            leftMeasure: number,
            difference: number,
            reeval1: number,
            reeval2: number,
            reevalFinal: number
        }
    ],
    postural: [
        {
            posture: string,
            below: number,
            above: number
        }
    ],
    functionalExam: string
}

//The interface that exports the state of the UserReducer as UserReducer
//  so that it can be used elsewhere
export interface PhysioEvalsReducer {
    PhysioEvalsReducer: PhysioEvalStateInterface
}

export interface SubjectiveExam {
    currentState: string,
    previousIssues: string,
    bodyChat: {
        x: number,
        y: number,
        intensity: number
    }
}

export interface ObjectiveExam {
    observations: string,
    articulations: [{
        articulation: string,
        movement: string,
        adm: string,
        amplitude: number,
        endFeel: string
    }]
}

export interface MuscularExam {
    muscles: [
        {
            muscle: string,
            movement: string,
            adm: string,
            intensity: string
        }
    ]
}

export interface PerimeterExam {
    perimeter: [
        {
            bodyPart: string,
            rightMeasure: number,
            leftMeasure: number,
            difference: number,
            reeval1: number,
            reeval2: number,
            reevalFinal: number
        }
    ]
}

export interface PosturalExam {
    postural: [
        {
            posture: string,
            below: number,
            above: number
        }
    ]
}

export interface FunctionalExam {
    functionalExam: string
}

//Interface for the state used by this reducer (required by TS)
export interface PhysioEvalStateInterface {
    subjectiveExam?: SubjectiveExam,
    objectiveExam?: ObjectiveExam,
    muscularExam?: MuscularExam,
    perimeterExam?: PerimeterExam,
    posturalExam?: PosturalExam,
    functionalExam?: FunctionalExam,
    physioEval?: PhysioEvalInterface
    isUpdating: boolean,
    isFetching: boolean
};

// Action Types
export const CLEAR_PHYSIO_EXAM = "CLEAR_PHYSIO_EXAM"
export const UPDATE_SELECTED_PATIENT = "UPDATE_SELECTED_PATIENT"
export const UPDATE_SUBJECTIVE_EXAM = "UPDATE_SUBJECTIVE_EXAM"
export const UPDATE_OBJECTIVE_EXAM = "UPDATE_OBJECTIVE_EXAM"
export const UPDATE_MUSCULAR_EXAM = "UPDATE_MUSCULAR_EXAM"
export const UPDATE_PERIMETER_EXAM = "UPDATE_PERIMETER_EXAM"
export const UPDATE_POSTURAL_EXAM = "UPDATE_POSTURAL_EXAM"
export const UPDATE_FUNCTIONAL_EXAM = "UPDATE_FUNCTIONAL_EXAM"
export const UPDATE_PHYSIOEVAL = "UPDATE_PHYSIOEVAL"




// Interface for the actions above (required by TS)
interface UpdateExamAction extends Action {
    payload: SubjectiveExam | ObjectiveExam | MuscularExam | PosturalExam | FunctionalExam
}



// Implementing the userStateInterface, setting the initial state
const appointmentInitState = {
    subjectiveExam: undefined,
    objectiveExam: undefined,
    muscularExam: undefined,
    perimeterExam: undefined,
    posturalExam: undefined,
    functionalExam: undefined,
    physioEval: undefined,
    isUpdating: false,
    isFetching: false

} as PhysioEvalStateInterface

export function PhysioEvalsReducer(state = appointmentInitState, action: Action | UpdateExamAction) {

    switch (action.type) {

        case CLEAR_PHYSIO_EXAM:
            return {
                appointmentInitState
            }

        case UPDATE_SELECTED_PATIENT:
            return {
                ...state,
                physioEval: {
                    ...state.physioEval,
                    patient : (action as UpdateExamAction).payload
                },
            };
        case UPDATE_SUBJECTIVE_EXAM:
            return {
                ...state,
                physioEval: {
                    ...state.physioEval,
                    ...(action as UpdateExamAction).payload
                },
                subjectiveExam: (action as UpdateExamAction).payload
            };
        case UPDATE_OBJECTIVE_EXAM:
            return {
                ...state,
                physioEval: {
                    ...state.physioEval,
                    ...(action as UpdateExamAction).payload
                },
                objectiveExam: (action as UpdateExamAction).payload
            };
        case UPDATE_MUSCULAR_EXAM:
            return {
                ...state,
                physioEval: {
                    ...state.physioEval,
                    ...(action as UpdateExamAction).payload
                },
                muscularExam: (action as UpdateExamAction).payload
            };
        case UPDATE_PERIMETER_EXAM:
            return {
                ...state,
                physioEval: {
                    ...state.physioEval,
                    ...(action as UpdateExamAction).payload
                },
                perimeterExam: (action as UpdateExamAction).payload
            };

        case UPDATE_POSTURAL_EXAM:
            return {
                ...state,
                physioEval: {
                    ...state.physioEval,
                    ...(action as UpdateExamAction).payload
                },
                posturalExam: (action as UpdateExamAction).payload
            };
        case UPDATE_FUNCTIONAL_EXAM:
            return {
                ...state,
                physioEval: {
                    ...state.physioEval,
                    ...(action as UpdateExamAction).payload
                },
                functionalExam: (action as UpdateExamAction).payload
            };

        case PURGE:
            return appointmentInitState;

        default:
            return state
    }

}

export default PhysioEvalsReducer;