import { ActionsType } from './actions';
import { Actions, StateType } from './types';

export const initialState: StateType = {
  uploadFileList: [],
  isGridLayout: false,
  activeFileId: '',
};

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionsType.UPLOAD_FILES_LIST: {
      return {
        ...state,
        uploadFileList: action.payload,
      };
    }
    case ActionsType.CHANGE_GRID_LAYOUT: {
      return {
        ...state,
        isGridLayout: !state.isGridLayout,
      };
    }
    case ActionsType.ACTIVE_FILE_ID: {
      return {
        ...state,
        activeFileId: action.payload,
      };
    }
    default:
      return state;
  }
};
