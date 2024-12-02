import { ActionsType } from './actions';
import { Actions, StateType } from './types';

export const initialState: StateType = {
  doctorsList: [],
  showAddDoctorModal: false,
  showDoctorDetailsModal: false,
  addDoctorModalState: {
    currentStepIndex: 0,
  },
  activeUserId: '',
};

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionsType.DOCTORS_LIST:
      return {
        ...state,
        doctorsList: action.payload,
      };
    case ActionsType.TOGGLE_ADD_DOCTOR_MODAL: {
      return {
        ...state,
        showAddDoctorModal: !state.showAddDoctorModal,
      };
    }
    case ActionsType.TOGGLE_DOCTOR_DETAILS_MODAL: {
      return {
        ...state,
        showDoctorDetailsModal: !state.showDoctorDetailsModal,
      };
    }
    case ActionsType.UPDATE_ADD_DOCTOR_MODAL_STATE: {
      return {
        ...state,
        addDoctorModalState: {
          ...state.addDoctorModalState,
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
