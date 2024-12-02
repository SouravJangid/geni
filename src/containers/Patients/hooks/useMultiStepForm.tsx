import { useCallback, useMemo } from 'react';
import { usePatientsContext } from '../state';
import { ActionsType } from '../state/actions';

export function useMultiStepForm() {
  const {
    state: {
      addPatientModalState: { currentStepIndex },
    },
    dispatch,
  } = usePatientsContext();

  const next = useCallback(() => {
    const updateCurrentStep = currentStepIndex >= 2 ? currentStepIndex : currentStepIndex + 1;
    dispatch({ type: ActionsType.UPDATE_ADD_PATIENT_MODAL_STATE, payload: { currentStepIndex: updateCurrentStep } });
  }, [currentStepIndex, dispatch]);

  const back = useCallback(() => {
    const updateCurrentStep = currentStepIndex <= 0 ? currentStepIndex : currentStepIndex - 1;
    dispatch({ type: ActionsType.UPDATE_ADD_PATIENT_MODAL_STATE, payload: { currentStepIndex: updateCurrentStep } });
  }, [currentStepIndex, dispatch]);

  const goTo = useCallback(
    (index: number) => {
      dispatch({ type: ActionsType.UPDATE_ADD_PATIENT_MODAL_STATE, payload: { currentStepIndex: index } });
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      currentStepIndex,
      next,
      back,
      goTo,
    }),
    [currentStepIndex, next, back, goTo],
  );
}
