import React from 'react';

interface addDoctorModalStateType {
  currentStepIndex: number;
}
export interface StateType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doctorsList: any;
  showAddDoctorModal?: boolean;
  showDoctorDetailsModal?: boolean;
  addDoctorModalState: addDoctorModalStateType;
  activeUserId?: string;
}

export interface StateContextType {
  state: StateType;
  dispatch: React.Dispatch<React.SetStateAction<Actions>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Actions = any;
