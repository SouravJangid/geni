import React from 'react';

interface addPatientModalStateType {
  currentStepIndex: number;
}
export interface StateType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patientsList: any;
  showAddPatientModal?: boolean;
  showPatientDetailsModal?: boolean;
  addPatientModalState: addPatientModalStateType;
  activeUserId?: string;
}

export interface StateContextType {
  state: StateType;
  dispatch: React.Dispatch<React.SetStateAction<Actions>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Actions = any;
