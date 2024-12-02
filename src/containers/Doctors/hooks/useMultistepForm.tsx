import { useCallback, useMemo } from 'react';
import { useDoctorsContext } from '../state';
import { ActionsType } from '../state/actions';

export function useMultistepForm() {
  const {
    state: {
      addDoctorModalState: { currentStepIndex },
    },
    dispatch,
  } = useDoctorsContext();

  const next = useCallback(() => {
    const updateCurrentStep = currentStepIndex >= 2 ? currentStepIndex : currentStepIndex + 1;
    dispatch({ type: ActionsType.UPDATE_ADD_DOCTOR_MODAL_STATE, payload: { currentStepIndex: updateCurrentStep } });
  }, [currentStepIndex, dispatch]);

  const back = useCallback(() => {
    const updateCurrentStep = currentStepIndex <= 0 ? currentStepIndex : currentStepIndex - 1;
    dispatch({ type: ActionsType.UPDATE_ADD_DOCTOR_MODAL_STATE, payload: { currentStepIndex: updateCurrentStep } });
  }, [currentStepIndex, dispatch]);

  const goTo = useCallback(
    (index: number) => {
      dispatch({ type: ActionsType.UPDATE_ADD_DOCTOR_MODAL_STATE, payload: { currentStepIndex: index } });
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
