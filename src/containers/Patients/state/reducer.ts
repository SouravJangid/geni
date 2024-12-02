import { ActionsType } from './actions';
import { Actions, StateType } from './types';

export const initialState: StateType = {
  patientsList: [],
  showAddPatientModal: false,
  showPatientDetailsModal: false,
  addPatientModalState: {
    currentStepIndex: 0,
  },
  activeUserId: '',
};

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionsType.PATIENTS_LIST: {
      return {
        ...state,
        patientsList: action.payload,
      };
    }
    case ActionsType.TOGGLE_ADD_PATIENT_MODAL: {
      return {
        ...state,
        showAddPatientModal: !state.showAddPatientModal,
      };
    }
    case ActionsType.TOGGLE_PATIENT_DETAILS_MODAL: {
      return {
        ...state,
        showPatientDetailsModal: !state.showPatientDetailsModal,
      };
    }
    case ActionsType.UPDATE_ADD_PATIENT_MODAL_STATE: {
      return {
        ...state,
        addPatientModalState: {
          ...state.addPatientModalState,
          ...action.payload,
        },
      };
    }
    case ActionsType.UPDATE_ACTIVE_USER_ID: {
      return {
        ...state,
        activeUserId: action.payload,
      };
    }
    default:
      return state;
  }
};
