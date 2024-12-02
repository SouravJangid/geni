import React from 'react';

export interface StateType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadFileList: any[];
  isGridLayout?: boolean;
  activeFileId?: string;
}

export interface StateContextType {
  state: StateType;
  dispatch: React.Dispatch<React.SetStateAction<Actions>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Actions = any;
